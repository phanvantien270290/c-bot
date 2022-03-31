/**
 * @owner BlueSky
 * @description The authentication Saga
 * @since 1.0.0
 * @date May 05, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { call, takeLatest, put } from 'redux-saga/effects';
import { beAuthenticated, AUTHENTICATION_SIGN_IN, beExpired, AUTHENTICATION_SIGN_OUT } from '../actions';

async function A(a: number) { return a; }

function* triggerSignInApi(): Generator<any> {
    const res = yield call<any>(A, 1);
    yield put(beAuthenticated(res));
}

function* triggerSignOutApi(): Generator<any> {
    const res = yield call(A, 1);
    yield put(beExpired(res));

}

export default function* sagaAuthentication() {
    yield takeLatest(AUTHENTICATION_SIGN_IN, triggerSignInApi);
    yield takeLatest(AUTHENTICATION_SIGN_OUT, triggerSignOutApi);
}