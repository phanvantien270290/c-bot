/**
 * @owner BlueSky
 * @description Define routers for File module
 * @since 1.0.0
 * @date Sep 09, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { Router, Application } from 'express';
import FileController from '../controllers/file.controller';
import FileService from '../services/file.service';

export default class FileRouter {
    app: Application;
    router: Router;
    controller: FileController;
    constructor(app: Application) {
        this.app = app;
        this.router = Router();
        this.controller = new FileController(new FileService());
    }

    onInit() {
        this.onRegisterRouting();

        this.app.use('/api/file', this.router);
    }

    onRegisterRouting() {
        this.router.post('/upload', this.controller.upload.bind(this.controller));
        this.router.get('/download', this.controller.download.bind(this.controller));
        this.router.get('/exportexcel', this.controller.exportExcel.bind(this.controller));
    }
}
