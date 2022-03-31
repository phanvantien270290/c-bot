/**
 * @owner BlueSky
 * @description Initialize the app routers
 * @since 1.0.0
 * @date Mar 22, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

import SwaggerRouter from './swagger.router';
import APITokenRouter from './api-token.router';
import PartnerRouter from './partner.router';
import ItemMasterRouter from './item-master.router';
import FileRouter from './file.router';
import AuthMiddleware from '../middlewares/auth.middleware';
import CountryRouter from './country.router';
import UserNavigationRouter from './user-navigation.router';
import UserRouter from './user.router';
import AuthenticationRouter from './authentication.router';
import DashboardRouter from "./dashboard.router";
import DozukiRouter from "./dozuki.router";

const requireAuthorization = (req, res, next) => {
    next();
};

export const registerRouter = (appExpress) => {
    const authMiddleware = new AuthMiddleware();
    appExpress.all('/api/*', authMiddleware.authenticate4App.bind(authMiddleware), requireAuthorization);

    const ItemMasterRtr = new ItemMasterRouter(appExpress);
    ItemMasterRtr.onInit();

    const PartnerRtr = new PartnerRouter(appExpress);
    PartnerRtr.onInit();

    const ApiTokenRtr = new APITokenRouter(appExpress);
    ApiTokenRtr.onInit();
    new DashboardRouter(appExpress).onInit();
    new SwaggerRouter(appExpress).onInit();
    new FileRouter(appExpress).onInit();
    new CountryRouter(appExpress).onInit();
    new UserNavigationRouter(appExpress).onInit();
    new UserRouter(appExpress).onInit();
    new AuthenticationRouter(appExpress).onInit();
    new DozukiRouter(appExpress).onInit();
};
