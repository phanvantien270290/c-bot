/**
 * @owner BlueSky
 * @description Handle accesses into Label Matrix
 * @since 1.0.0
 * @date Oct 22, 2020
 * @contributors
 *     Phan V Tien <tien.phan@ccintegration.com>
 */
// import { Request, Response } from "express";
import BaseController from "./base.controller";
import { IDashboardService } from '../services/dashboard.service';

export default class DashboardController extends BaseController {
    service: IDashboardService;
    constructor(service: IDashboardService) {
        super(service);
    }
}