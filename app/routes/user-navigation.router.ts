/**
 * @owner BlueSky
 * @description Define routers for User Navigation module
 * @since 1.0.0
 * @date Nov 09, 2020
 * @contributors
 *      Phat Le <phat.le@ccintegration.com>
 */
import { Router, Application } from 'express';
import UserNavigationController from "../controllers/user-navigation.controller";
import UserNavigationService from '../services/user-navigation.service';
import UserNavigationRepository from '../repositories/user-navigation.repository';
export default class UserNavigationRouter {
    app: Application;
    router: Router;
    controller: UserNavigationController;
    constructor(app: Application) {
        this.app = app;
        this.router = Router();
        this.controller = new UserNavigationController(new UserNavigationService(new UserNavigationRepository()));
    }

    onInit() {
        this.onRegisterRouting();

        this.app.use('/api/user-navigation', this.router);
    }

    onRegisterRouting() {
        this.router.get('/find', this.controller.find.bind(this.controller));
        this.router.get('/retrieve', this.controller.retrieve.bind(this.controller));
        this.router.post('/update', this.controller.update.bind(this.controller));
    }
}
