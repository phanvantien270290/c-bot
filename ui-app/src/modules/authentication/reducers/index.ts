/**
 * @owner BlueSky
 * @description The authentication Reducer
 * @since 1.0.0
 * @date May 05, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

import { AUTHENTICATION_AUTHENTICATED, AUTHENTICATION_UNAUTHENTICATED } from "../actions";

const initialState = {};
export default function authenticationReducer(state = initialState, action: IAction) {
    switch (action.type) {
        case AUTHENTICATION_AUTHENTICATED:
        case AUTHENTICATION_UNAUTHENTICATED:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}