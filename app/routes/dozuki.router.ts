/**
 * @owner BlueSky
 * @description Dozuki routers
 * @since 1.0.0
 * @date Mar 22, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { Router, Application } from 'express';
import DozukiController from "../controllers/dozuki.controller";

export default class DozukiRouter {
    app: Application;
    router: Router;
    controller: DozukiController;
    constructor(app: Application) {
        this.app = app;
        this.router = Router();
        this.controller = new DozukiController(null);
    }

    onInit() {
        this.onRegisterRouting();

        this.app.use('/api/dozuki', this.router);
    }

    onRegisterRouting() {
        // Unlike app.param(), router.param() does not accept an array of route parameters.
        // router.param('id', function (req, res, next, id) {
        //     req.labelItem = {};
        //     next();
        // })

        this.router.get('/find', this.controller.find.bind(this.controller));
        this.router.get('/retrieve', this.controller.retrieve.bind(this.controller));
        this.router.get('/categories/all', this.controller.pullCategories.bind(this.controller));
        this.router.get('/guides/all', this.controller.pullGuides.bind(this.controller));
        this.router.get('/worklogs/all', this.controller.pullWorklogs.bind(this.controller));
        this.router.get('/guides/daily', this.controller.pullGuideDaily.bind(this.controller));
        this.router.get('/worklogs/list', this.controller.getWorklogs.bind(this.controller));
        this.router.get('/worklogs/daily', this.controller.pullWorklogDaily.bind(this.controller));
        this.router.get('/worklogs/report/daily', this.controller.sendWorklogDaily.bind(this.controller));
        this.router.get('/worklogs/report/weekly', this.controller.sendWorklogWeekly.bind(this.controller));
        this.router.get('/worklogs/update/daily', this.controller.updateInProgressWorklogDaily.bind(this.controller));
        this.router.get('/worklogs/label/update/daily', this.controller.updateFromLabelDaily.bind(this.controller));
        this.router.get('/worklogs/label/update/all', this.controller.updateAllFromLabel.bind(this.controller));
        this.router.get('/users/all', this.controller.pullUsers.bind(this.controller));
        this.router.get('/users/daily', this.controller.pullUserDaily.bind(this.controller));
        this.router.get('/categories/daily', this.controller.pullCategoryDaily.bind(this.controller));
        this.router.get('/worklogs/report2acu/daily', this.controller.sendWorklog2AcuDaily.bind(this.controller));
        this.router.get('/worklogs/report2acu/weekly', this.controller.sendWorklog2AcuWeekly.bind(this.controller));

        // External API Call
        this.router.get(`/${process.env.APP_API_VERSION}/categories/all`, this.controller.authenticateNew.bind(this.controller), this.controller.pullCategories.bind(this.controller));
        this.router.get(`/${process.env.APP_API_VERSION}/guides/all`, this.controller.authenticateNew.bind(this.controller), this.controller.pullGuides.bind(this.controller));
        this.router.get(`/${process.env.APP_API_VERSION}/worklogs/all`, this.controller.authenticateNew.bind(this.controller), this.controller.pullWorklogs.bind(this.controller));
        this.router.get(`/${process.env.APP_API_VERSION}/guides/daily`, this.controller.authenticateNew.bind(this.controller), this.controller.pullGuideDaily.bind(this.controller));
        this.router.get(`/${process.env.APP_API_VERSION}/worklogs/daily`, this.controller.authenticateNew.bind(this.controller), this.controller.pullWorklogDaily.bind(this.controller));
        this.router.get(`/${process.env.APP_API_VERSION}/worklogs/report/daily`, this.controller.authenticateNew.bind(this.controller), this.controller.sendWorklogDaily.bind(this.controller));
        this.router.get(`/${process.env.APP_API_VERSION}/worklogs/report/weekly`, this.controller.authenticateNew.bind(this.controller), this.controller.sendWorklogWeekly.bind(this.controller));
        this.router.get(`/${process.env.APP_API_VERSION}/worklogs/update/daily`, this.controller.authenticateNew.bind(this.controller), this.controller.updateInProgressWorklogDaily.bind(this.controller));
        this.router.get(`/${process.env.APP_API_VERSION}/worklogs/label/update/daily`, this.controller.authenticateNew.bind(this.controller), this.controller.updateFromLabelDaily.bind(this.controller));
        this.router.get(`/${process.env.APP_API_VERSION}/worklogs/label/update/all`, this.controller.authenticateNew.bind(this.controller), this.controller.updateAllFromLabel.bind(this.controller));
        this.router.get(`/${process.env.APP_API_VERSION}/users/all`, this.controller.authenticateNew.bind(this.controller), this.controller.pullUsers.bind(this.controller));
        this.router.get(`/${process.env.APP_API_VERSION}/users/daily`, this.controller.authenticateNew.bind(this.controller), this.controller.pullUserDaily.bind(this.controller));
        this.router.get(`/${process.env.APP_API_VERSION}/categories/daily`, this.controller.authenticateNew.bind(this.controller), this.controller.pullCategoryDaily.bind(this.controller));
        this.router.get(`/${process.env.APP_API_VERSION}/worklogs/report2acu/daily`, this.controller.authenticateNew.bind(this.controller), this.controller.sendWorklog2AcuDaily.bind(this.controller));
        this.router.get(`/${process.env.APP_API_VERSION}/worklogs/report2acu/weekly`, this.controller.authenticateNew.bind(this.controller), this.controller.sendWorklog2AcuWeekly.bind(this.controller));
    }
}
