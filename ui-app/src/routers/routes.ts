

/**
 * @owner BlueSky
 * @description The routers for App
 * @since 1.0.0
 * @date May 05, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 *      Phat Le <phat.le@ccintegration.com>
 */

import DashboardPage from '../modules/dashboard/pages/dashboard.page';
import AuthenticationPage from '../modules/authentication/pages/authentication.page';
import PermissionManagementPage from '../modules/permission/pages/permission.page';
import APITokenPage from '../modules/api-token/pages/api-token.page';
import { ID_MENU } from '../utils/enum.util';
import NotFoundPage from '../components/not-found-page.component';
import ErrorPage from '../components/error-page.component';



const RouteComponent = (id: ID_MENU): React.FC<any> => {
    const components: { [key in ID_MENU]: any } = {
        [ID_MENU.DASHBOARD]: DashboardPage,
        [ID_MENU.APITOKEN]: APITokenPage,
        [ID_MENU.PERMISSIONMANAGEMENT]: PermissionManagementPage,
        [ID_MENU.NOT_FOUND]: NotFoundPage,
        [ID_MENU.LOGIN]: AuthenticationPage,
        [ID_MENU.ERROR_PAGE]: ErrorPage,
        [ID_MENU.ABOUT]: null,
        [ID_MENU.ADMINISTRATION]: null,
        [ID_MENU.DOZUKI]: null
    }
    return components[id];
}
// const privateRoutes: INavItem[] = [
//     {
//         id: ID_MENU.DASHBOARD,
//         name: 'Dashboard',
//         active: true,
//         path: "/",
//     },
// ]
const publicRoutes: INavItem[] = [
    {
        id: ID_MENU.LOGIN,
        name: 'LOGIN',
        active: true,
        path: "/login",
    },
    {
        id: ID_MENU.ERROR_PAGE,
        name: 'NOT_FOUND',
        active: true,
        path: "/error-page",
    },
    {
        id: ID_MENU.NOT_FOUND,
        name: 'OTHER',
        active: true,
        path: "*",
    },
]

export { RouteComponent, publicRoutes }
