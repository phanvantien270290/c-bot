/**
 * @owner BlueSky
 * @description ...
 * @since 1.0.0
 * @date Mar 22, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { Request, Response } from "express";
import { format } from 'date-fns';
import BaseController from "./base.controller";
import { IAPITokenService } from '../services/api-token.service';
import { STATUS } from '../utils/enum.util';
import { newRegex } from '../utils/helper.util';

export default class APITokenController extends BaseController {
    service: IAPITokenService;
    constructor(service: IAPITokenService) {
        super(service);
    }
    find(req: Request, res: Response) {
        const searchParams: ISearchParams = this.getParameters(req);
        const searchFields = searchParams.searchFields;
        if (searchFields) {
            if (searchFields.obsoleted) {
                searchFields.obsoleted = searchFields.obsoleted === STATUS.INACTIVE;
            }
            if (searchFields.expiredAt) {
                const _date = format(new Date(searchFields.expiredAt), 'yyyy-MM-dd');

                searchFields.expiredAt = {
                    $gte: new Date(`${_date}`)
                };
            }
            if (searchFields.app) {
                searchFields.app = newRegex(searchFields.app);
            }
        }
        this.service.paginate(searchParams.searchFields, searchParams.options)
            .then(resp => {
                res.status(200).send(resp);
            });
    }
}