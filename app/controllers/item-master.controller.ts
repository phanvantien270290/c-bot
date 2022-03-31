/**
 * @owner BlueSky
 * @description Handle accesses into Label Information and Item Master
 * @since 1.0.0
 * @date Aug 10, 2020
 * @contributors
 *      Tien Phan <tienphan@ccintegration.com>
 */
import { Request, Response } from "express";
import BaseController from "./base.controller";
import ItemMasterService, { IItemMasterService } from '../services/item-master.service';
import { FilterOption } from '../interfaces/mongo-option/filter-option.interface';
import { IItemMasterProp } from '../interfaces/item-master.interface';
import { CustomResponse } from '../interfaces/custom-response.interface';
import { newRegex } from '../utils/helper.util';
export default class PrinterController extends BaseController {
    service: IItemMasterService;
    constructor(service: ItemMasterService) {
        super(service);
    }

    getDataset(req: Request, res: Response) {
        const { searchFields, options } = this.getParameters(req);
        const response: CustomResponse = {
            status: false
        }
        const _options: FilterOption = {
            fields: { partNumber: 1, custId: 1, _id: 0, labelInformation: 1 },
            sort: options && options.sort ? options.sort : { partNumber: 1 }
        };
        if (options && options.fields) {
            _options.fields = { ..._options.fields, ...options.fields, }
        }

        if (!searchFields.obsoleted) {
            searchFields.obsoleted = { $ne: true };
        }
        this.service.find(searchFields, _options)
            .then(resp => {
                res.status(200).send(resp);
            }).catch((err) => {
                response.msg = err ? err.message : 'Something went wrong!';
                res.status(500).send(response);
            });
    }

    getListItem(req: Request, res: Response) {
        try {
            const searchParams: ISearchParams = this.getParameters(req);
            const searchFields: IItemMasterProp = {};
            const options: FilterOption = searchParams.options;
            const response: CustomResponse = { status: false };

            if (searchParams.searchFields) {
                const _searchFields: IItemMasterProp = searchParams.searchFields;
                if (_searchFields.partNumber) {
                    if (Array.isArray(_searchFields.partNumber)) {
                        searchFields.partNumber = { $in: _searchFields.partNumber } as any;
                    } else {
                        searchFields.partNumber = newRegex(_searchFields.partNumber) as any;
                    }
                }
                if (_searchFields.id) {
                    searchFields.id = _searchFields.id;
                }
                if (_searchFields.hasOwnProperty('obsoleted')) {
                    const isTrueSet = (_searchFields.obsoleted as any == 'true');
                    searchFields.obsoleted = isTrueSet;
                }
                if (_searchFields.custId) {
                    if (Array.isArray(_searchFields.custId)) {
                        searchFields.custId = { $in: _searchFields.custId } as any;
                    } else {
                        searchFields.custId = _searchFields.custId;
                    }
                }
            }

            this.service.paginate(searchFields, options)
                .then(resp => {
                    res.status(200).send(resp);
                }).catch((err) => {
                    response.msg = err ? err.message : 'Something went wrong!';
                    res.status(500).send(response);
                });
        } catch (err) {
            res.status(500).send(err);
        }
    }

    deleteOne(req: Request, res: Response) {
        const { searchFields } = this.getParameters(req);
        const response: CustomResponse = {
            status: false
        }
        if (!searchFields._id) {
            response.msg = 'Can\'t delete please try again';
        }
        if (response.msg) {
            res.status(200).send(response);
        } else {
            this.service.deteleOne(searchFields, true).then((resp) => {
                res.status(200).send(resp);
            }).catch((err) => {
                response.msg = err ? err.message : 'Can\'t delete please try again';
                res.status(500).send(response);
            });
        }
    }
}