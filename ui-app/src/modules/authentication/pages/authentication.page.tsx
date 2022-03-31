/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date Sep 26, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

import React from 'react';
import { Location } from 'react-router-dom';
import { AuthenticationContainer } from '../containers/authentication.container';

const AuthenticationPage: React.FC<{ location?: Location }> = (props) => {
    return <AuthenticationContainer {...props} />
}
export default AuthenticationPage