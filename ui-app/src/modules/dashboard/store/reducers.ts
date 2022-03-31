/**
 * @owner BlueSky
 * @description 
 * @since 1.0.0
 * @date May 01, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

import { RETRIEVE_WORKLOGS, SYNC_PARAMS_WORKLOGS } from './actions';


const initGetWorkLogs: IGetListResp<any> = {
    data: [],
    totalCount: 0,
    loading: true
};
const initSyncParamsWorklog: ISearchParams = {
    searchFields: {},
    options: { limit: 20, page: 0 },

};

export function retrieveWorklogsReducer(state = initGetWorkLogs, action: IAction) {
    switch (action.type) {
        case RETRIEVE_WORKLOGS.REQUEST:
            return { ...state };
        case RETRIEVE_WORKLOGS.PAGINATION:
            return { ...initGetWorkLogs, totalCount: state.totalCount };
        case RETRIEVE_WORKLOGS.SUCCESS:
            return { loading: false, ...action.payload };

        case RETRIEVE_WORKLOGS.FAILURE:
            return { ...initGetWorkLogs };
        default:
            return state;
    }
}

export function syncParamsWorklogReducer(state = initSyncParamsWorklog, action: IAction): ISearchParams {
    switch (action.type) {
        case SYNC_PARAMS_WORKLOGS.REQUEST:
        case SYNC_PARAMS_WORKLOGS.SUCCESS:
            return { ...state, ...action.payload };
        case SYNC_PARAMS_WORKLOGS.FAILURE:
            return { ...initGetWorkLogs };
        default:
            return state;
    }
}
