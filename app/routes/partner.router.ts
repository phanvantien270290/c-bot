/**
 * @owner BlueSky
 * @description Define routers for Partner module
 * @since 1.0.0
 * @date July 27, 2020
 * @contributors
 *     Tien Phan <tien.phan@ccintegration.com>
 */
import { Router, Application } from 'express';
import PartnerController from "../controllers/partner.controller";
import PartnerService from '../services/partner.service';
import PartnerRepository from '../repositories/partner.repository';

export default class PartnerRouter {
    app: Application;
    router: Router;
    controller: PartnerController;
    constructor(app: Application) {
        this.app = app;
        this.router = Router();
        this.controller = new PartnerController(new PartnerService(new PartnerRepository));
    }

    onInit() {
        this.onRegisterRouting();
        this.app.use('/api/partner', this.router);
    }

    onRegisterRouting() {
        this.router.get('/combobox', this.controller.getDataset.bind(this.controller));
    }
}
