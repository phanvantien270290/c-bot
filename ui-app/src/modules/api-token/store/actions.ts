/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date Mar 19, 2021
 * @contributors
 *      Phat Le <phat.le@ccintegration.com>
 */

import { createRequestTypes } from '../../../utils/helper';

export const GET_LIST = createRequestTypes('ApiToken::GETLIST');
export const GET_ONE = createRequestTypes('ApiToken::GETONE');

export function getApiToken(params?: any) {
    return {
        type: GET_ONE.REQUEST,
        params
    };
}

export function getListApiToken(params?: any) {
    return {
        type: GET_LIST.REQUEST,
        params
    };
}
