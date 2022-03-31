/**
 * @owner BlueSky
 * @description Session storage
 * @since 1.0.0
 * @date May 08, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

import { saveJson, loadJson, clearStorage } from "./storage.service"

const USER_PROFILE = 'USER::PROFILE';

export const persist = (user: IUser) => {
    return saveJson(USER_PROFILE, user);
}

export const retrieve = () => {
    const user: IUser = loadJson(USER_PROFILE);
    return user;
}

export const getToken = () => {
    return retrieve()?.token || '';
}

export const getProviderToken = () => {
    return retrieve()?.providerToken || '';
}
export const isLogged = () => {
    const user: IUser = loadJson(USER_PROFILE);
    // return true;
    return !!(user && user.token);
}

export const remove = () => {
    clearStorage(USER_PROFILE);
}