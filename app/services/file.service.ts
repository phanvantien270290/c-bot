/**
 * @owner BlueSky
 * @description Handle business logic for Files
 * @since 1.0.0
 * @date Sep 08, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

import FileHandler from '../cores/lib/file.lib';
import XLSXHandler from '../cores/lib/xslx.lib';
import { Fields, Files } from 'formidable';
import { CustomResponse } from '../interfaces/custom-response.interface';
import MongodbFS from '../cores/lib/mongodb-fs.lib';
import { OPTION_CONNECTION } from '../config/mongo-connection.config';
import { CUSTOMER, MODULE, WORKLOG } from '../utils/enum.util';

import ItemMasterService from './item-master.service';
import ItemMasterRepository from '../repositories/item-master.repository';
import WorklogService from '../modules/dozuki/services/worklog.service';
import WorklogRepository from '../modules/dozuki/repositories/worklog.repository';

const BIZ_TYPE = {
    EXTRACT: 'EXTRACT',
    STORE_DB: 'STORE_DB',
    STORE_DISK: 'STORE_DISK'
};

export default class FileService {
    constructor() {

    }

    async upload(fields: Fields, files: Files) {
        const { type, dirPath } = fields;
        let results = {};
        let mfs = null;
        if (type === BIZ_TYPE.STORE_DB) {
            const opt = { ...OPTION_CONNECTION };
            delete opt.useCreateIndex;
            delete opt.useFindAndModify;
            mfs = new MongodbFS('', opt);
        }

        for (const name in files) {
            const file: any = files[name];
            results[name] = {};
            switch (type) {
                case CUSTOMER.SILVERPEAK:
                case CUSTOMER.FORTINET:
                    // const sheets = XLSXHandler.toJson(file.path);
                    // for (const sheet in sheets) {
                    //     // Just get the first sheet
                    //     break;
                    // }
                    FileHandler.remove(file.path);
                    break;
                case BIZ_TYPE.EXTRACT:
                    // const stream = FileHandler.createReadStream(file.path);
                    // stream.on('data', (chunk) => {
                    //     arr.push(chunk.toString('utf-8'));
                    // })
                    // stream.on('close', () => {
                    //     console.log(arr)
                    // })
                    break;
                case BIZ_TYPE.STORE_DISK:
                    FileHandler.move(file.path, dirPath as string, true);
                    results[name] = { status: true, msg: 'Uploaded successfully' };
                    break;
                case BIZ_TYPE.STORE_DB:
                    const res = await mfs.storeFile(file.path, file.name, { contentType: file.type, name: file.name, refId: null, ...fields });
                    FileHandler.remove(file.path);
                    results[name] = res;
                    break;
                case 'LABEL_INFORMATION':
                    const itemMasterSheets = XLSXHandler.toJson(file.path);
                    const itemMasterService = new ItemMasterService(new ItemMasterRepository());
                    for (const itemMasterSheet in itemMasterSheets) {
                        results = await itemMasterService.parseFromExcel(itemMasterSheets[itemMasterSheet], type);
                        // Just get the first sheet
                        break;
                    }
                    FileHandler.remove(file.path);
                    break;
                default:
                    break;
            }
        }

        if (mfs) {
            mfs.disconnect();
        }

        return results;
    }

    async download(option: { id?: string, file?: string, type?: string }) {
        const res: CustomResponse = {
            status: true
        };
        if (!option) {
            res.msg = 'Request is invalid';
            return res;
        }
        if (option.id) {

        } else if (option.file && option.type) {
            const path = FileHandler.exist(`./files/${option.type}/${option.file}`);
            if (path) {
                res.data = {
                    path, filename: option.file
                };
            } else {
                res.status = false;
                res.msg = 'File not found'
            }
        }
        return res;
    }

    async exportExcel(option: { query?: IQuery, module?: MODULE, report_type?: string }) {
        let res: CustomResponse = {
            status: false
        };

        // Standardize the query string
        const query = Object.create(null);
        const queryInputted = option.query.searchFields || option.query;
        for (const prop in queryInputted) {
            const value = queryInputted[prop];
            if (Array.isArray(value) && prop !== '$or') {
                query[prop] = { $in: value };
            } else if (typeof (value) === 'object' && value['^'] !== undefined) {
                const _val = value['^'];
                if (Array.isArray(_val)) {
                    query[prop] = { $nin: _val };
                } else {
                    query[prop] = { $ne: _val };
                }
            } else {
                query[prop] = value;
            }
        }

        switch (option.module) {
            case MODULE.DOZUKI_WORKLOG:
                const wklgService = new WorklogService(new WorklogRepository());
                res = await (option.report_type === WORKLOG.REPORT2ACU ? wklgService.exportExcel2Acu(query) : wklgService.exportExcel(query));
                break;
            default:
                res.msg = ``;
                break;
        }
        return res;
    }


}