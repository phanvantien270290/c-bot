/**
 * @owner BlueSky
 * @description Define routers for Label module
 * @since 1.0.0
 * @date Jan 21, 2021
 * @contributors
 *      Phat Le <phat.le@ccintegration.com>
 */
import { Router, Application } from 'express';
import APIAuthenticationController from '../controllers/authentication.controller';
import AuthenticationRepository from '../repositories/authentication.repository';
import AuthenticationService from '../services/authentication.service';

export default class AuthenticationRouter {
    app: Application;
    router: Router;
    controller: APIAuthenticationController;
    constructor(app: Application) {
        this.app = app;
        this.router = Router();
        this.controller = new APIAuthenticationController(new AuthenticationService(new AuthenticationRepository()));
    }

    onInit() {
        this.onRegisterRouting();

        this.app.use('/api/auth', this.router);
    }

    onRegisterRouting() {
        this.router.post('/signin', this.controller.signIn.bind(this.controller));
        this.router.post('/signout', this.controller.signOut.bind(this.controller));
        this.router.get('/channel', this.controller.authChannelToken.bind(this.controller));
        this.router.post('/sso', this.controller.authSSO.bind(this.controller));
    }
}
