/**
 * @owner BlueSky
 * @description ...
 * @since 1.0.0
 * @date Mar 22, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

import BaseController from "./base.controller";
import { ICountryService } from '../services/country.service';

export default class CountryController extends BaseController {
    service: ICountryService;
    constructor(service: ICountryService) {
        super(service);
    }
}