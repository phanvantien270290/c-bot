/**
 * @owner BlueSky
 * @description Handle business logic
 * @since 1.0.0
 * @date Jan 12, 2022
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

import _ from 'lodash';
import EXCELJS from 'exceljs';
import { BulkWriteOperation } from 'mongodb';
import { IWorklogRepository } from '../repositories/worklog.repository';
import BaseService, { IService } from '../../../services/base.service';
import UserService from '../services/user.service';
import UserRepository from '../repositories/user.repository';
import { CustomResponse } from '../../../interfaces/custom-response.interface';
import { FilterOption } from '../../../interfaces/mongo-option/filter-option.interface';
import { DateHelper, StringHelper } from '../../../utils/helper.util';
import { HEADER_EXCEL } from '../../../utils/excel-header.util';
import { IWorklogProp } from "../interfaces/worklog.interface";
import XLSXHandler from '../../../cores/lib/xslx.lib';
import { DOWNLOAD_DIR, FORMAT_DATE } from '../../../utils/enum.util';
import LabelService from '../../c-label/services/label.service';
import DAPIHandler from '../lib/api.lib';
export interface IWorklogService extends IService {
    pull(criteria: IQuery): Promise<CustomResponse>;
    updateFromLabel(criteria: IQuery, option?: FilterOption): Promise<CustomResponse>;
    exportExcel(query: IQuery): Promise<CustomResponse>;
}

export default class WorklogService extends BaseService implements IWorklogService {
    repository: IWorklogRepository;
    constructor(repository: IWorklogRepository) {
        super(repository);
    }

    async pull(criteria: IQuery, option: FilterOption = {}) {
        const dozukiAPI = new DAPIHandler();
        const res = await dozukiAPI.pullWorkLogs(criteria);
        if (!res.status) {
            return res;
        }
        return this.save(res.data, option);
    }

    async exportRecords(criteria: IQuery, properties: string[], option: FilterOption = {}) {
        const pipeline = [{
            $match: criteria
        }, {
            $lookup: {
                from: "guide",
                let: { wl_guide: "$guideid" },
                pipeline: [{
                    $match: {
                        $expr: {
                            $and: [
                                { $eq: ["$guideid", "$$wl_guide"] },
                                { $eq: ["$category", "Pelco"] }
                            ]
                        }
                    }
                }, {
                    $project: { category: 1, title: 1, difficulty: 1 }
                }],
                as: "guide"
            },
        }, {
            $match: { guide: { $size: 1 } }
        }, {
            $sort: { guideid: 1, workorderid: 1 }
        }];

        const res = await this.aggregateExtended(pipeline);
        if (!res.status || !res.data?.length) {
            return res;
        }
        const userIDs = _.uniq(_.map(res.data, 'userid'));
        let users: Array<any> = [];
        if (userIDs.length) {
            const userService = new UserService(new UserRepository())
            const options = { fields: { userid: 1, username: 1, _id: 0 } }
            const { data, status } = await userService.find({ 'userid': { $in: userIDs } }, options) || null;
            users = status ? data : null;
        }

        // Check items duplicated
        const wklgArr = [], len = res.data.length;
        const cachedData = {};
        for (let i = len - 1; i >= 0; i--) {
            const row = res.data[i];
            const _guide = row.guide?.length ? row.guide[0] : null;
            const item: IWorklogProp = { duplicated: false };

            for (const k of properties) {
                item[k] = row[k] || '';
            }
            if ('userid' in item && users && users.length) {
                const user = users.find(user => user['userid'] === item['userid'])
                item['userid'] = user && user.username;
            }
            if ('guide_title' in item) {
                item['guide_title'] = _guide?.title;
            }
            if ('category' in item) {
                item['category'] = _guide?.category;
            }
            if ('difficulty' in item) {
                item['difficulty'] = _guide?.difficulty;
            }
            if ('duration' in item) {
                item['duration'] = DateHelper.secondsToTimeString(item['duration']) as any
            }
            if (item['starttime']) {
                item['starttime'] = DateHelper.formatFromUnixTime(row.starttime, FORMAT_DATE.DMYHMS) as any;
            }
            if (item['endtime']) {
                item['endtime'] = DateHelper.formatFromUnixTime(row.endtime, FORMAT_DATE.DMYHMS) as any;
            }
            if (!item['workorderid_refs']) {
                item['workorderid_refs'] = 'NOT MATCH'
            }
            if (_.isArray(item['signoffs'])) {
                const _usernamesUnique = _.uniq(_.map(item['signoffs'], 'username'));
                item['signoffs'] = _usernamesUnique.join(', ') as any;
            }
            if (_.isArray(row['work_data'])) {
                const po = row['work_data'].find(o => /(Production\s{0,}Order)/ig.test(o.label));
                item['production_order'] = po?.value || '';
            }

            const cachedKey = `${row.workorderid}${row.guideid}`;
            if (!cachedData[cachedKey]) {
                cachedData[cachedKey] = 1;
                if (i > 0 && cachedKey === `${res.data[i - 1].workorderid}${res.data[i - 1].guideid}`) {
                    item.duplicated = true;
                }
            } else {
                cachedData[cachedKey]++;
                item.duplicated = true;
            }

            item.status = StringHelper.capitalize((item.status === 'started') ? 'In Progress' : item.status);
            wklgArr.unshift(item);
        }
        res.data = wklgArr;
        return res;
    }

    async updateFromLabel(criteria: IQuery) {
        const pipeline = this.getPipeline({ cancelled: 0, ...criteria });
        const res = await this.aggregateExtended(pipeline);
        if (!res.status || !res.data?.length) {
            return res;
        }

        const worklogs: IWorklogProp[] = res.data;
        const workorderids = _.uniq(_.map(worklogs, 'workorderid')); // workorderid is serialNumber in c-label data

        const service = new LabelService();
        const _criteria = { searchFields: { serialNumber: workorderids } },
            _option = { fields: { serialNumber: 1, oemSerialNumber: 1, custId: 1, partNumber: 1, _id: 0 } };
        const { data, status } = await service.pullLabels({ ..._criteria, options: _option });
        if (!status || !data) {
            return null;
        }
        const labels = data;
        const bulkOps: BulkWriteOperation<any>[] = [];
        for (const wlItem of worklogs) {
            const _guide = wlItem.guide?.length ? wlItem.guide[0] : null;
            const lItem = _.find(labels, label => label.serialNumber === wlItem.workorderid && _guide && label.custId === _guide.category?.toUpperCase());
            if (lItem) {
                const _filter = { "_id": wlItem._id };
                const _updateFields = { "workorderid_refs": lItem.oemSerialNumber };
                const _bulkOp: BulkWriteOperation<any> = this.setData2BulkWrite(_filter, _updateFields, "updateOne", null);
                bulkOps.push(_bulkOp);
            }
        }

        return bulkOps.length ? this.bulkWrite(bulkOps, { ordered: false }) : { status: false, msg: 'No data updated' };
    }

    /**
     * Convert the query object into a aggregate pipeline for looking up to related collections
     * @param criteria 
     * @param sort 
     * @returns array
     */
    private getPipeline(criteria: IQuery, sort: { [prop: string]: any } = null) {
        return [{
            $match: criteria
        }, {
            $lookup: {
                from: "user",
                let: { wl_user: "$userid" },
                pipeline: [{
                    $match: {
                        $expr: {
                            $and: [
                                { $eq: ["$userid", "$$wl_user"] }
                            ]
                        }
                    }
                }, {
                    $project: { username: 1, unique_username: 1, _id: 0 }
                }],
                as: "user"
            }
        }, {
            $lookup: {
                from: "guide",
                let: { wl_guide: "$guideid" },
                pipeline: [{
                    $match: {
                        $expr: {
                            $and: [
                                { $eq: ["$guideid", "$$wl_guide"] },
                            ]
                        }
                    }
                }, {
                    $project: { category: 1, title: 1, difficulty: 1, _id: 0 }
                }],
                as: "guide"
            }
        }, {
            $match: { guide: { $size: 1 } }
        }, {
            $sort: sort || { guideid: 1, workorderid: 1 }
        }];
    }

    async getWorklogs(params: ISearchParams) {
        const {
            searchFields = {},
            options: { sort = null, ...otherOptions }
        } = params;
        const _criteria = this.getPipeline({}, sort);
        const fields = {
            "workorderid": 1, "workorderid_refs": 1, "guideid": 1,
            "userid": 1, "starttime": 1, "duration": 1, "signoffs": 1,
            "status": 1, 'endtime': 1,
        }
        if (searchFields.hasOwnProperty('workorderid')) {
            searchFields['workorderid'] = new RegExp(searchFields['workorderid'], 'gi');
        }
        if (searchFields.hasOwnProperty('status')) {
            searchFields['status'] = new RegExp(searchFields['status'], 'i');
        }

        const _options: FilterOption = { ...otherOptions, sort: _criteria[4].$sort, fields }
        const pipelineMerged = [
            { "$lookup": { ..._criteria[2].$lookup } },//guide
            { "$lookup": { ..._criteria[1].$lookup } }, //user
        ];
        const result = await this.repository.paginateWithPipeline(searchFields, _options, pipelineMerged);

        if (result.status) {
            const len = result.data.length;
            for (let i = len - 1; i >= 0; i--) {
                const row = result.data[i];
                if (row['duration']) {
                    row['duration'] = DateHelper.secondsToTimeString(row['duration']) as any
                }
                if (row['starttime']) {
                    row['starttime'] = DateHelper.formatFromUnixTime(row.starttime, FORMAT_DATE.DMYHMS) as any;
                }
                if (row['endtime']) {
                    row['endtime'] = DateHelper.formatFromUnixTime(row.endtime, FORMAT_DATE.DMYHMS) as any;
                }
                if (!row['workorderid_refs']) {
                    row['workorderid_refs'] = 'NOT MATCH'
                }
            }
        }

        return result;
    }

    async exportExcel(query: IQuery): Promise<CustomResponse> {
        const columns = HEADER_EXCEL.DOZUKI_WORKLOG.REPORT.mainHeader;
        const headerKeys = columns.map(h => h.key);
        const res = await this.exportRecords(query, headerKeys);
        if (!res.status) {
            return res;
        }

        const filename = XLSXHandler.randomizeFileName('CBOT-Dozuki-Pelco-Worklog-Report');
        const path = `${DOWNLOAD_DIR.PATH}/${filename}`;
        const sheetName = 'Dozuki Worklogs'
        const workbook = new EXCELJS.stream.xlsx.WorkbookWriter({ filename: path, useStyles: true })
        const ws = workbook.addWorksheet(sheetName, { views: [{ state: 'frozen', ySplit: 1 }] });
        ws.columns = columns;
        //set style for header
        XLSXHandler.fillPatternRow(ws, 1, "CCCCCC");
        XLSXHandler.alignText(ws, 1);
        XLSXHandler.styleRows(ws, 1);
        const { data } = res;
        for (const i in data) {
            ws.addRow(data[i]);
            if (data[i]['workorderid_refs'] === 'NOT MATCH') {
                XLSXHandler.styleCell(ws, `C${+i + 2}`, { font: { color: { argb: 'FF0000' } } } as any)
            }
            data[i].duplicated && XLSXHandler.fillPatternRow(ws, +i + 2, "E5F049");
            XLSXHandler.alignText(ws, +i + 2);
        }
        workbook.commit();
        return { status: true, data: { path, filename } };
    }

    async exportExcel2Acu(query: IQuery): Promise<CustomResponse> {
        const columns = HEADER_EXCEL.DOZUKI_WORKLOG.REPORT2ACU.mainHeader;
        const headerKeys = columns.map(h => h.key);
        const res = await this.exportRecords(query, headerKeys);
        if (!res.status) {
            return res;
        }

        const filename = XLSXHandler.randomizeFileName('CBOT-Dozuki-Pelco-Worklog-Report-to-Acumatica');
        const path = `${DOWNLOAD_DIR.PATH}/${filename}`;
        const sheetName = 'Sheet1'
        const workbook = new EXCELJS.stream.xlsx.WorkbookWriter({ filename: path, useStyles: true })
        const ws = workbook.addWorksheet(sheetName, { views: [{ state: 'frozen', ySplit: 1 }] });
        ws.columns = columns;
        //set style for header
        XLSXHandler.fillPatternRow(ws, 1, "CCCCCC");
        XLSXHandler.alignText(ws, 1);
        XLSXHandler.styleRows(ws, 1);
        const { data } = res;
        for (const i in data) {
            const row = data[i];
            row.order_type = 'RO';
            row.operation_id = '0010';
            row.qty = '1.00';
            row.warehouse = 'CCI-2048';
            row.location = 'REC';
            row.expiration_date = '';
            row.receipt_no = '';
            row.qty_scrapped = '';
            row.uom = '';
            row.reason_code = '';

            ws.addRow(row);
            if (data[i]['workorderid_refs'] === 'NOT MATCH') {
                XLSXHandler.styleCell(ws, `H${+i + 2}`, { font: { color: { argb: 'FF0000' } } } as any)
            }
            data[i].duplicated && XLSXHandler.fillPatternRow(ws, +i + 2, "E5F049");
            XLSXHandler.alignText(ws, +i + 2);
        }
        workbook.commit();
        return { status: true, data: { path, filename } };
    }
}