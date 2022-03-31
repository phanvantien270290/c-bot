/**
 * @owner BlueSky
 * @description 
 * @since 1.0.0
 * @date May 01, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

import { AUTHENTICATION_AUTHENTICATED, AUTHENTICATION_UNAUTHENTICATED } from '../../authentication/actions';
import { NAV_RENDER } from './actions';

const initialState: { [x: string]: any, data: INavItem[] } = {
    data: []
};

export default function navReducer(state = initialState, action: IAction) {
    switch (action.type) {
        case NAV_RENDER:
            return {
                ...state,
                data: action.payload.data,
            };
        case AUTHENTICATION_UNAUTHENTICATED:
            if (!action.payload) {
                state.data = [];
            }
            return {
                ...state,
                isAuthenticated: true
            };
        case AUTHENTICATION_AUTHENTICATED:
            return {
                ...state,
                isAuthenticated: true
            };
        default:
            return state;
    }
}