/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date Sep 26, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { redirectToLogin } from '../../../utils/helper';
import { isLogged } from '../../../services/session.service';
export const AuthenticationContainer: React.FC<{ location?: any }> = ({ location }) => {
    const _isLogged = isLogged();
    if (!_isLogged) {
        redirectToLogin();
    }
    // return <Navigate to={"/"} replace={true} />
    return _isLogged ? <Navigate to={"/"} replace={true} /> : <Outlet />
}