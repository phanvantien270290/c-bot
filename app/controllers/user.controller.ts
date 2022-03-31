/**
 * @owner BlueSky
 * @description Handle accesses into Printing History Object
 * @since 1.0.0
 * @date Sep 25, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { Request, Response } from "express";
import { CustomResponse } from '../interfaces/custom-response.interface';
import { FilterOption } from '../interfaces/mongo-option/filter-option.interface';

import { newRegex } from '../utils/helper.util';

import BaseController from "./base.controller";
import { IUserService }  from '../services/user.service';

export default class UserListController extends BaseController {
    service: IUserService;
    constructor(service: IUserService) {
        super(service);
    }
    count(req: Request, res: Response) {
        const { searchFields } = this.getParameters(req);
        this.service.count(searchFields).then((response: CustomResponse) => {
            return res.status(200).send(response);
        });
    }

    find(req: Request, res: Response) {
        const searchParams: ISearchParams = this.getParameters(req);
        let searchFields: any = searchParams.searchFields || {};
        let options: FilterOption = searchParams.options || {}

        searchFields.isdeleted = {$ne: 1};

        if (searchParams.searchText) {
            const text = newRegex(searchParams.searchText);

            searchFields['$or'] = [{
                'loginname': text
            }, {
                'name': text
            }, {
                'email': text
            }];
        } else {
            if (searchFields.name) {
                searchFields.name = newRegex(searchFields.name);
            }
            if (searchFields.email) {
                searchFields.email = newRegex(searchFields.email);
            }
        }
        this.service.paginate(searchFields, options).then(resp => {
            return res.status(200).send(resp);
        })
    }
}