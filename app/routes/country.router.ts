/**
 * @owner BlueSky
 * @description Define routers for Country module
 * @since 1.0.0
 * @date Nov 12, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { Router, Application } from 'express';
import CountryController from '../controllers/country.controller';
import CountryService from '../services/country.service';
import CountryRepository from '../repositories/country.repository';

export default class CountryRouter {
    app: Application;
    router: Router;
    controller: CountryController;
    constructor(app: Application) {
        this.app = app;
        this.router = Router();
        this.controller = new CountryController(new CountryService(new CountryRepository()));
    }

    onInit() {
        this.onRegisterRouting();

        this.app.use('/api/country', this.router);
    }

    onRegisterRouting() {
        this.router.get('/find', this.controller.find.bind(this.controller));
        this.router.post('/save', this.controller.save.bind(this.controller));
        this.router.put('/update', this.controller.update.bind(this.controller));
        this.router.delete('/delete', this.controller.remove.bind(this.controller));
        this.router.get('/retrieve', this.controller.retrieve.bind(this.controller));
    }
}
