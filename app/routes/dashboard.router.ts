/**
 * @owner BlueSky
 * @description Define routers for Dashboard module
 * @since 1.0.0
 * @date Apr 08, 2021
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 */
import { Router, Application } from 'express';
import DashboardController from '../controllers/dashboard.controller';
import DashboardService from '../services/dashboard.service';
import DashboardRepository from '../repositories/dashboard.repository';

export default class DashboardRouter {
    app: Application;
    router: Router;
    controller: DashboardController;
    constructor(app: Application) {
        this.app = app;
        this.router = Router();
        this.controller = new DashboardController(new DashboardService(new DashboardRepository()));
    }

    onInit() {
        this.onRegisterRouting();

        this.app.use('/api/dashboard', this.router);
    }

    onRegisterRouting() {

    }
}
