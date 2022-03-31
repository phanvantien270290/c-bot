/**
 * @owner BlueSky
 * @description Dozuki Guide task
 * @since 1.0.0
 * @date Jan 20, 2022
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { BulkWriteOperation } from "mongodb"

import _ from "lodash";
import DAPIHandler from "../lib/api.lib";
import Mailer from '../../../cores/lib/mail.lib';
import FileHandler from '../../../cores/lib/file.lib';
import { Helper, DateHelper, StringHelper } from "../../../utils/helper.util";
import { Logger } from '../../../utils/logger.util';
import WorklogService from "../services/worklog.service";
import WorklogRepository from "../repositories/worklog.repository";
import FileService from '../../../services/file.service';
import { FREQUENCY, MODULE, WORKLOG } from '../../../utils/enum.util';

const fetchAll = async () => {
    let page = 1;
    const dozuki = new DAPIHandler();
    const dozukiService = new WorklogService(new WorklogRepository());
    while (page > 0) {
        const pagingOffset = Helper.getPagingOffset(page, 200);
        const res = await dozuki.pullWorkLogs(pagingOffset);
        if (!res.status || !res.data || !res.data.results || !res.data.results.length) {
            Logger.info(`Worklog fetchAll ended with message: ${res.msg || 'No data'}`, new Date());
            page = -1;
            continue;
        }
        dozukiService.save(res.data.results, {});
        page++;
    }
}

const sendReport = (frequency: FREQUENCY = FREQUENCY.DAILY) => async (date: number | Date = null, criteria: any = {}) => {
    const email = process.env.DOZUKI_DAILY_REPORT_WORKLOG_EMAIL_ADDRESS || 'swservices-notification@ccintegration.com';
    const emailArr = email.split(',');
    const mailer = new Mailer()
        .setTo(emailArr)
        .setSubject(`[Dozuki][${StringHelper.capitalize(frequency)} Report] - Pelco Worklog`);

    const { eUnixTime, lUnixTime } = DateHelper.getUnixTimeRange(frequency, date)
    const _criteria = criteria || {};
    const res = await new FileService().exportExcel({
        query: {
            ..._criteria,
            $or: [
                { starttime: { $gte: eUnixTime, $lte: lUnixTime } },
                { endtime: { $gte: eUnixTime, $lte: lUnixTime } }
            ]
        },
        module: MODULE.DOZUKI_WORKLOG
    });
    const attachmentPath = res.data?.path || '';
    if (res.status && attachmentPath) {
        mailer
            .addAttachment(attachmentPath, res.data.filename)
            .setContent(composeEmailContent(1), 'html');
    } else {
        mailer.setContent(composeEmailContent(0), 'html');
    }

    mailer.send().then(res => {
        Logger.info(`${frequency} eMail - Worklog`, res);
        FileHandler.remove(attachmentPath);
        mailer.closeTransport();
    });
}

const updateFromLabel = (frequency: FREQUENCY = FREQUENCY.DAILY) => async (date: number | Date = null, criteria: any = {}) => {
    const { eUnixTime, lUnixTime } = DateHelper.getUnixTimeRange(frequency, date);
    const _criteria = criteria || {};
    const query = {
        ..._criteria,
        $or: [
            { starttime: { $gte: eUnixTime, $lte: lUnixTime } },
            { endtime: { $gte: eUnixTime, $lte: lUnixTime } }
        ]
    }

    const dozukiService = new WorklogService(new WorklogRepository());
    const res = await dozukiService.updateFromLabel(query);
    Logger.info(`Worklog dailyUpdateFromCLabel ended`, res);
}

const dailyInProgressFetch = async () => {
    const dozuki = new DAPIHandler();
    const dozukiService = new WorklogService(new WorklogRepository());
    const { data } = await dozukiService.find({ status: { $ne: 'complete' } });
    const dataCached = {};
    if (Array.isArray(data) && data.length) {
        for (const item of data) {
            const cachedKey = `${item.guideid}_${item.userid}`;
            if (dataCached[cachedKey]) {
                continue;
            } else {
                dataCached[cachedKey] = [];
            }

            let page = 1;
            const criteria = { guideid: item.guideid, userid: item.userid };
            while (page > 0) {
                const pagingOffset = Helper.getPagingOffset(page, 200);
                const res = await dozuki.pullWorkLogs({ ...pagingOffset, ...criteria });
                if (!res.status || !res.data || !res.data.results || !res.data.results.length) {
                    page = -1;
                    continue;
                }

                dataCached[cachedKey] = dataCached[cachedKey].concat(res.data.results);
                page++;
            }
        }

        const workorderids = [];
        const bulkOps: BulkWriteOperation<any>[] = [];
        for (const item of data) {
            const cachedKey = `${item.guideid}_${item.userid}`;
            const itemArr = dataCached[cachedKey];

            const _item = itemArr.find(o => o.entryid === item.entryid);
            if (_item && (item.status != _item.status || item.duration != _item.duration)) {
                Logger.info(`Worklog daily updated: ${_item.workorderid} - ${item.status} -> ${_item.status} | ${item.duration} -> ${_item.duration}`);
                bulkOps.push({
                    updateOne:
                    {
                        filter: { _id: item._id },
                        update: { $set: _item },
                        upsert: true
                    }
                });

                if (_item.status === 'complete') {
                    workorderids.push(_item.workorderid);
                }
            }
        }
        const res = (bulkOps.length) ? await dozukiService.bulkWrite(bulkOps, { ordered: false }) : null;
        Logger.info(`Worklog dailyUpdateFetch ended`, res);

        workorderids.length && dozukiService.updateFromLabel({ workorderid: { $in: workorderids } });
    }
}

const dailyFetch = async (date: number | Date = null) => {
    const dozukiService = new WorklogService(new WorklogRepository());
    let page = 1;
    const unixTime = DateHelper.toEarlyUnixTime(date || new Date());
    const dozuki = new DAPIHandler();
    const criteria = {
        order: 'DESC'
    };
    while (page > 0) {
        const pagingOffset = Helper.getPagingOffset(page, 200);
        const res = await dozuki.pullWorkLogs({ ...pagingOffset, ...criteria });
        if (!res.status || !res.data || !res.data.results || !res.data.results.length) {
            Logger.info(`Worklog dailyFetch ended with message: ${res.msg || 'No data'}`, new Date());
            page = -1;
            continue;
        }

        for (const worlog of res.data.results) {
            const wklgTimeUnix = worlog.endtime || worlog.starttime;
            if (wklgTimeUnix < unixTime) {
                Logger.info(`Worklog dailyFetch ended`, new Date());
                page = -10;
                break;
            }
            await dozukiService.findAndUpdate({ entryid: worlog.entryid }, worlog, { upsert: true });
        }

        page++;
    }

    await updateFromLabel(FREQUENCY.DAILY)(date);
    await dailyInProgressFetch();
}

function composeEmailContent(numOfWorks = null) {
    const html = [
        '<p>Dear,</p>',
        (numOfWorks) ? '<p>Please see the attachment for more details</p>' : '<p>No worklogs were operated today.</p>',
        '<br/><p>Best regards!</p>',
        '<p>The cBot team</p>'
    ];
    return html.join('');
}

const updateAllFromLabel = async (numOfRecords: number) => {
    const totalRecord = numOfRecords || 21737;
    const recordPerPage = 100;
    const totalPage = Math.ceil(totalRecord / recordPerPage);
    let page = 1;
    const dozukiService = new WorklogService(new WorklogRepository());
    while (page <= totalPage) {
        const start = (page - 1) * recordPerPage;
        const { data } = await dozukiService.find({}, { fields: { workorderid: 1 }, start, limit: recordPerPage });
        page++;
        if (!data || !data.length) {
            continue;
        }

        const workorderids = _.uniq(_.map(data, 'workorderid'));
        const res = await dozukiService.updateFromLabel({ workorderid: { $in: workorderids } });
        Logger.info(`Worklog allUpdateFromCLabel page=${page - 1}`, res);
    }
    Logger.info(`Worklog allUpdateFromCLabel end`, new Date());
}

const sendReport2Acu = (frequency: FREQUENCY = FREQUENCY.DAILY) => async (date: number | Date = null, criteria: any = {}) => {
    const email = process.env.DOZUKI_DAILY_REPORT_WORKLOG_EMAIL_ADDRESS || 'swservices-notification@ccintegration.com';
    const emailArr = email.split(',');
    const mailer = new Mailer()
        .setTo(emailArr)
        .setSubject(`[Dozuki][${StringHelper.capitalize(frequency)} Report-to-Acumatica] - Pelco Worklog`);

    const { eUnixTime, lUnixTime } = DateHelper.getUnixTimeRange(frequency, date)
    const _criteria = criteria || {};
    const res = await new FileService().exportExcel({
        query: {
            ..._criteria,
            $or: [
                { starttime: { $gte: eUnixTime, $lte: lUnixTime } },
                { endtime: { $gte: eUnixTime, $lte: lUnixTime } }
            ]
        },
        module: MODULE.DOZUKI_WORKLOG, report_type: WORKLOG.REPORT2ACU.toString()
    });
    const attachmentPath = res.data?.path || '';
    if (res.status && attachmentPath) {
        mailer
            .addAttachment(attachmentPath, res.data.filename)
            .setContent(composeEmailContent(1), 'html');
    } else {
        mailer.setContent(composeEmailContent(0), 'html');
    }

    mailer.send().then(res => {
        Logger.info(`${frequency} eMail - Worklog`, res);
        FileHandler.remove(attachmentPath);
        mailer.closeTransport();
    });
}

const WorklogTasks = {
    fetchAll, dailyFetch, dailyInProgressFetch, updateAllFromLabel,
    dailyReport: sendReport(FREQUENCY.DAILY),
    weeklyReport: sendReport(FREQUENCY.WEEKLY),
    dailyUpdateFromLabel: updateFromLabel(FREQUENCY.DAILY),
    dailyReport2Acu: sendReport2Acu(FREQUENCY.DAILY),
    weeklyReport2Acu: sendReport2Acu(FREQUENCY.WEEKLY),
};
export default WorklogTasks;