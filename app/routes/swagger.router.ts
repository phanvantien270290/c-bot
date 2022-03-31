/**
 * @owner BlueSky
 * @description Define Swagger Router for API UI
 * @since 1.0.0
 * @date Apr 13, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../../apidoc/v1/swagger.json';
import { Router, Application } from 'express';
import dotenv from "dotenv";
dotenv.config();

export default class SwaggerRouter {
    app: Application;
    router: Router;
    constructor(app: Application) {
        this.app = app;
        this.router = Router();

        this.setupEnv();
    }

    onInit() {
        this.app.use('/api-docs', swaggerUi.serve);
        this.app.get('/api-docs', swaggerUi.setup(swaggerDocument, {
            explorer: false,
            customCss: '.swagger-ui .topbar { display: none }'
        }));
    }

    setupEnv() {
        swaggerDocument.host = `${process.env.APP_HOST}`;
    }
}