/**
 * @owner BlueSky
 * @description Handle accesses into Label Object
 * @since 1.0.0
 * @date Mar 22, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { Request, Response } from "express";
import BaseController from "./base.controller";
import PartnerService, { IPartnerService } from '../services/partner.service';
import { FilterOption } from '../interfaces/mongo-option/filter-option.interface';
import { IPartnerProp } from '../interfaces/partner.interface';
import { CustomResponse } from '../interfaces/custom-response.interface';
export default class PrinterController extends BaseController {
    service: IPartnerService;
    constructor(service: PartnerService) {
        super(service);
    }

    getDataset(req: Request, res: Response) {
        const searchParams: ISearchParams = this.getParameters(req);
        let searchFields: IPartnerProp = {};
        const response: CustomResponse = {
            status: false
        }
        const options: FilterOption = { fields: { company: 1, custId: 1, _id: 0 }, sort: { custId: 1 } };
        if (searchParams.searchFields) {
            let _searchFields: IPartnerProp = searchParams.searchFields;
            searchFields = {
                ...searchFields,
                ..._searchFields,
            }
        }
        this.service.find(searchFields, options)
            .then(resp => {
                res.status(200).send(resp);
            }).catch((err) => {
                response.msg = err ? err.message : 'Something went wrong!';
                res.status(500).send(response);
            });
    }
}