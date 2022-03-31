/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date May 01, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import { NAV_FETCH, NAV_RENDER } from './actions';
import { getApi } from '../../../services/api';

function* fetchMenu(action: any) {
    const endpoint = '/api/user-navigation/find';
    const options = {
        sort: {
            _id: 1
        },
        fields: {
            '_id': 0,
            'id': 1,
            'name': 1,
            'path': 1,
            'parentId': 1,
            'users': 1,
            'private': 1,
            'active': 1,
            "order": 1,
        }
    }
    const response: IResponse = yield call(getApi, endpoint, { responseType: "json", options: options });
    const data: Array<any> = yield response.status ? response.data : [];
    yield put({ type: NAV_RENDER, payload: { data: data, isAuthenticated: true } });
}

export function* loadNav() {
    yield takeLatest(NAV_FETCH, fetchMenu);
}
