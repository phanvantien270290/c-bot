/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date July 27, 2020
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 */

import { put, takeEvery, takeLatest } from 'redux-saga/effects';
import { GET_LIST_PARTNER, GET_LIST_COUNTRY } from './actions';
// import { fetchPartnerCombobox, fetchCountry } from './services';;
function* getListPartner(payload?: any) {
    try {
        // const params = payload.params;
        // const response = yield call(fetchPartnerCombobox, { ...params });
        // const data: IPrinter[] =[];// response.status ? response.data : [];
        yield put({ type: GET_LIST_PARTNER.SUCCESS, payload: { data: [] } });

    } catch (error) {
        yield put({ type: GET_LIST_PARTNER.FAILURE });
    }
}

function* getListCountry(payload?: any) {
    try {
        // const params = payload.params;
        // const resp = yield call(fetchCountry, params);

        let _actionType = GET_LIST_COUNTRY.SUCCESS;
        // let objResp = {};
        // if (resp.status) {
        //     objResp = { data: resp.data, totalCount: resp.total };
        // } else {
        //     objResp = { msg: resp.msg || 'Get a list of country failure', status: false };
        //     _actionType = GET_LIST_COUNTRY.FAILURE
        // }

        yield put({ type: _actionType, payload: { data: [] } });
    } catch (error) {
        yield put({ type: GET_LIST_COUNTRY.FAILURE, payload: { msg: 'Get a list of country failure !' } });
    }
}

export function* watchFetchOtherData() {
    yield takeEvery(GET_LIST_PARTNER.REQUEST, getListPartner);
    yield takeLatest(GET_LIST_COUNTRY.REQUEST, getListCountry);
}
