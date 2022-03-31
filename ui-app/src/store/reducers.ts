/**
 * @owner BlueSky
 * @description Define a root reducer for the app
 * @since 1.0.0
 * @date May 01, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

import { combineReducers } from 'redux'
import NavReducer from '../modules/nav/store/reducers';
import { retrieveWorklogsReducer, syncParamsWorklogReducer } from '../modules/dashboard/store/reducers';
import { getListPartnerReducer, getListCountryReducer } from './shared/reducers';

import { getListApiTokenReducer, getOneApiTokenReducer } from '../modules/api-token/store/reducers';
import { AUTHENTICATION_UNAUTHENTICATED } from '../modules/authentication/actions';

const appReducer = combineReducers<IState>({
    nav: NavReducer,

    country: getListCountryReducer,
    dashboard: combineReducers({
        retrieveWorklogs: retrieveWorklogsReducer,
        syncParamsWorklogs: syncParamsWorklogReducer
    }),

    partner: combineReducers({
        getCombobox: getListPartnerReducer
    }),

    apiToken: combineReducers({
        getList: getListApiTokenReducer,
        getOne: getOneApiTokenReducer
    }),
});

const rootReducer = (state: any, action: any) => {
    if (action.type === AUTHENTICATION_UNAUTHENTICATED) {
        state = undefined;
    }
    return appReducer(state, action);

};
export default rootReducer;