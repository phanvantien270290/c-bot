/**
 * @owner BlueSky
 * @description Define a root saga for the app
 * @since 1.0.0
 * @date May 01, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

import { all, spawn } from 'redux-saga/effects';
import { loadNav } from '../modules/nav/store/sagas';
import { watchFetchOtherData } from './shared/sagas';
import { watchFetchApiToken } from '../modules/api-token/store/sagas';
import { watchFetchDashboard } from '../modules/dashboard/store/sagas'
function* rootSaga() {
    yield all([
        spawn(loadNav),
        spawn(watchFetchOtherData),
        spawn(watchFetchApiToken),
        spawn(watchFetchDashboard)
    ]);
}
export default rootSaga;