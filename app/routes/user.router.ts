/**
 * @owner BlueSky
 * @description Define routers for User Navigation module
 * @since 1.0.0
 * @date Nov 09, 2020
 * @contributors
 *      Phat Le <phat.le@ccintegration.com>
 */
import { Router, Application } from 'express';
import UserController from "../controllers/user.controller";
import UserService from '../services/user.service';
import UserRepository from '../repositories/user.repository';

export default class UserListRouter {
    app: Application;
    router: Router;
    controller: UserController;
    constructor(app: Application) {
        this.app = app;
        this.router = Router();
        this.controller = new UserController(new UserService(new UserRepository()));
    }

    onInit() {
        this.onRegisterRouting();

        this.app.use('/api/user', this.router);
    }

    onRegisterRouting() {
        this.router.get('/find', this.controller.find.bind(this.controller));
    }
}
