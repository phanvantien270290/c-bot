/**
 * @owner BlueSky
 * @description Define routers for Label module
 * @since 1.0.0
 * @date Mar 22, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { Router, Application } from 'express';
import APITokenController from '../controllers/api-token.controller';
import APITokenService from '../services/api-token.service';
import APITokenRepository from '../repositories/api-token.repository';

export default class APITokenRouter {
    app: Application;
    router: Router;
    controller: APITokenController;
    constructor(app: Application) {
        this.app = app;
        this.router = Router();
        this.controller = new APITokenController(new APITokenService(new APITokenRepository()));
    }

    onInit() {
        this.onRegisterRouting();

        this.app.use('/api/token', this.router);
    }

    onRegisterRouting() {
        this.router.get('/find', this.controller.find.bind(this.controller));
        this.router.post('/save', this.controller.save.bind(this.controller));
        this.router.put('/update', this.controller.update.bind(this.controller));
        this.router.delete('/delete', this.controller.remove.bind(this.controller));
        this.router.get('/retrieve', this.controller.retrieve.bind(this.controller));
    }
}
