/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date Mar 19, 2021
 * @contributors
 *      Phat Le <phat.le@ccintegration.com>
 */

import { call, put, takeEvery } from 'redux-saga/effects';
import { GET_LIST, GET_ONE } from './actions';
import { getListApiToken, findOneAPIToken } from './services';
import { convertParamsToRequest } from '../../../utils/helper';
function* getOne(payload?: any): Generator<any> {
    try {
        const params = payload.params;
        if (params.reset) {
            yield put({ type: GET_ONE.RESET });
        } else {
            const response: any = yield call(findOneAPIToken, params);
            const data = yield response.status ? { data: response.data } : { data: null };
            yield put({ type: GET_ONE.SUCCESS, payload: data });
        }
    } catch (error) {
        yield put({ type: GET_ONE.FAILURE });
    }
}

function* getList(payload?: any): Generator<any> {
    try {
        const params = convertParamsToRequest(payload.params);
        if (params.reset) {
            yield put({ type: GET_LIST.RESET });
        } else {
            const response: any = yield call(getListApiToken, params);
            const data = yield response.status ? { data: response.data, totalCount: response.total } : { data: [], totalCount: 0 };
            yield put({ type: GET_LIST.SUCCESS, payload: data });
        }
    } catch (error) {
        yield put({ type: GET_LIST.FAILURE });
    }
}

export function* watchFetchApiToken() {
    yield takeEvery(GET_LIST.REQUEST, getList);
    yield takeEvery(GET_ONE.REQUEST, getOne);
}
