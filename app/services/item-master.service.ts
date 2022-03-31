/**
 * @owner BlueSky
 * @description Handle business logic for Item Master Object
 * @since 1.0.0
 * @date July 27, 2020
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 */
import BaseService, { IService } from './base.service';
import { IRepository } from '../repositories/base.repository';
import { FilterOption } from '../interfaces/mongo-option/filter-option.interface';
import { IItemMasterProp } from '../interfaces/item-master.interface';
import { MSG, MsgManager } from '../utils/message.util';
import { StringHelper } from '../utils/helper.util';
import { CustomResponse } from '../interfaces/custom-response.interface';

export interface IItemMasterService extends IService { }

export default class ItemMasterService extends BaseService implements IItemMasterService {
    constructor(repository: IRepository) {
        super(repository);
    }

    async update(query: IQuery, data: IItemMasterProp, option: FilterOption) {
        const res = await this.preUpdateEvent(data);
        if (!res.status) {
            return res;
        }

        if (res.new) {
            delete data._id;
            return this.repository.save(data, option);
        }
        return this.repository.update(query, data, option);
    }

    async updateOne(query: IQuery, data: IItemMasterProp, option: FilterOption) {
        const res = await this.preUpdateEvent(data);
        if (!res.status) {
            return res;
        }

        if (res.new) {
            delete data._id;
            return this.repository.save(data, option);
        }
        return this.repository.updateOne(query, data, option);
    }

    private async preUpdateEvent(data: IItemMasterProp) {
        const res = await this.retrieve({ _id: data._id });
        data.obsoleted = Boolean(data.obsoleted.toString() !== 'false');
        if (!res.status || (data.obsoleted && res.data.obsoleted)) {
            res.msg = res.msg || MsgManager.message('The Part Number [%s] is NOT UPDATED because of being DEACTIVATED.', data.partNumber);
            res.status = false;
            return res;
        }

        const doc: IItemMasterProp = res.data;
        if (doc.version === data.version) {
            // Re-activate
            if (doc.obsoleted && !data.obsoleted) {
                const result = await this.repository.findAndUpdate({
                    partNumber: data.partNumber,
                    custId: data.custId,
                    version: { $ne: data.version },
                    obsoleted: { $ne: true }
                }, { obsoleted: true }, {});

                if (result.msg === MSG.NOT_FOUND.FIND) {
                    result.status = true;
                }
                result.new = false;
                return result;
            }
        } else {
            // Re-activate with NEW version
            if (doc.obsoleted && !data.obsoleted) {
                const tem = await this.repository.retrieve({
                    partNumber: data.partNumber,
                    custId: data.custId,
                    version: data.version,
                    _id: { $ne: data._id }
                }, {});

                if (tem.data) {
                    tem.status = false;
                    tem.msg = StringHelper.sprintf(`The PartNumber [%s] and Version [%s] are duplicated`, data.partNumber, data.version);
                    return tem;
                }

                const result = await this.repository.findAndUpdate({
                    partNumber: data.partNumber,
                    custId: data.custId,
                    version: { $ne: data.version },
                    obsoleted: { $ne: true }
                }, { obsoleted: true }, {});

                if (result.msg === MSG.NOT_FOUND.FIND) {
                    result.status = true;
                }
                result.new = result.status;
                return result;
            }

            if (!data.obsoleted) {
                // Create NEW version
                const result = await this.repository.findAndUpdate({ _id: doc._id }, { obsoleted: true }, {});
                result.new = result.status;
                return result;
            }
        }
        return res;
    }

    async parseFromExcel(rows: Array<any>, custId: string) {
        const res: CustomResponse = {
            status: true
        };
        const totalItemMasterFields = 16;
        let itemMasters: IItemMasterProp[] = [];
        // Get row has example new data here
        rows.splice(0, 2);
        for (const row of rows) {
            let rowValues: any = Object.values(row);
            let emptyRows = rowValues.filter((row) => row === '');
            if (emptyRows.length === totalItemMasterFields) {
                continue;
            }
            let coo: string[] = [];
            let assembled: string[] = [];
            if (StringHelper.trim(rowValues[12])) {
                coo = StringHelper.trim(rowValues[12]).split(",");
            }
            if (StringHelper.trim(rowValues[13])) {
                assembled = StringHelper.trim(rowValues[13]).split(",");
            }
            let itemMaster: IItemMasterProp = {
                custId: rowValues[1].trim().toUpperCase(),
                partNumber: rowValues[2].trim().toUpperCase(),
                custPartNumber: rowValues[3],
                manfPartNumber: rowValues[4],
                version: rowValues[5],
                description: rowValues[6],
                labelInformation: {
                    product: rowValues[7],
                    productCode: rowValues[8],
                    description: rowValues[9],
                    hardwareId: rowValues[10],
                    partNumberCode: rowValues[11],
                    coo,
                    assembled,
                    ean: rowValues[14],
                    sku: rowValues[15],
                    upc: rowValues[16]
                }
            }
            itemMasters.push(itemMaster);
        }
        res.data = itemMasters;
        return res;
    }
}