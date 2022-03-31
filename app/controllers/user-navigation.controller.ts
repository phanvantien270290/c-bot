/**
 * @owner BlueSky
 * @description Handle accesses into Printing History Object
 * @since 1.0.0
 * @date Sep 25, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import BaseController from "./base.controller";
import { IUserNavigationService } from '../services/user-navigation.service';

export default class UserNavigationController extends BaseController {
    service: IUserNavigationService;
    constructor(service: IUserNavigationService) {
        super(service);
    }
}