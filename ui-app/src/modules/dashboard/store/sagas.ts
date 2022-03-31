/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date June 16, 2020
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 */

import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { convertParamsToRequest } from '../../../utils/helper';
import { RETRIEVE_WORKLOGS, SYNC_PARAMS_WORKLOGS } from './actions';
import { retrieveWorklogs as retrieveWorklogsService } from './services';



function* retrieveWorklogs(payload?: any): any {
    const objResp = { data: [], totalCount: 0 };
    try {
        const params = convertParamsToRequest(payload.params);
        const resp = yield call(retrieveWorklogsService, params);
        if (resp.status) {
            objResp.data = resp.data;
            objResp.totalCount = resp.total;
        }
        yield put({ type: RETRIEVE_WORKLOGS.SUCCESS, payload: objResp });
    } catch (error) {
        yield put({ type: RETRIEVE_WORKLOGS.FAILURE, payload: objResp });
    }
}

function* syncParamsWorklog(payload?: any): any {
    const { params } = payload;
    yield put({ type: SYNC_PARAMS_WORKLOGS.SUCCESS, payload: params });

}

export function* watchFetchDashboard() {
    yield takeLatest(RETRIEVE_WORKLOGS.REQUEST, retrieveWorklogs);
    yield takeEvery(RETRIEVE_WORKLOGS.PAGINATION, retrieveWorklogs);
    yield takeLatest(SYNC_PARAMS_WORKLOGS.REQUEST, syncParamsWorklog);
}
