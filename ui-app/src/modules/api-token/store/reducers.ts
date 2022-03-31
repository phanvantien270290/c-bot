/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date Mar 19, 2021
 * @contributors
 *      Phat Le <phat.le@ccintegration.com>
 */

import { GET_LIST, GET_ONE } from './actions';
import { IAPIToken, IAPITokenNullable } from '../../../interfaces/api-token.interface';
const initGetList: IGetListResp<IAPIToken> = {
    data: [],
    totalCount: 0,
    loading: false
};
const initGetOne: IGetOneResp<IAPITokenNullable> = {
    data: null,
    loading: false
};
const getOneApiTokenReducer = (state = initGetOne, action: IAction): IGetOneResp<IAPITokenNullable> => {
    switch (action.type) {
        case GET_ONE.REQUEST:
            return { data: null, loading: true };
        case GET_ONE.SUCCESS:
            const { data } = action.payload;
            return { data, loading: false };
        case GET_ONE.FAILURE:
            return { data: null, loading: false };
        case GET_ONE.RESET:
            return { data: null, loading: false };
        default:
            return state;
    }
}

const getListApiTokenReducer = (state = initGetList, action: IAction): IGetListResp<IAPIToken> => {
    switch (action.type) {
        case GET_LIST.REQUEST:
            return { ...state, data: [], loading: true };
        case GET_LIST.SUCCESS:
            const { data, totalCount } = action.payload;
            return { data, totalCount, loading: false };
        case GET_LIST.RESET:
            return { data: [], loading: false }
        case GET_LIST.FAILURE:
            return { ...state, data: [], loading: false };
        default:
            return state;
    }
}

export {
    getListApiTokenReducer,
    getOneApiTokenReducer
}
