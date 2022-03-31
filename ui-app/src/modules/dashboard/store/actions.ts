/**
 * @owner BlueSky
 * @description 
 * @since 1.0.0
 * @date May 01, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { createRequestTypes } from '../../../utils/helper';

export const RETRIEVE_WORKLOGS = createRequestTypes('CBOT_WORKLOG::RETRIEVE')

export const SYNC_PARAMS_WORKLOGS = createRequestTypes('CBOT_WORKLOG::SYNC_PARAMS')
export function retrieveWorklogs(params?: any, type: string = RETRIEVE_WORKLOGS.REQUEST) {
    return { type, params };
}

export function syncParamsWorklogs(params?: ISearchParams, type: string = SYNC_PARAMS_WORKLOGS.REQUEST) {
    return { type, params };
}