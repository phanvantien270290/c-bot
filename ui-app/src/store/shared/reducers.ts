/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date July 27, 2020
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 */

import { GET_LIST_PARTNER,GET_LIST_COUNTRY } from './actions';
import { IPartner } from '../../interfaces/partner.interface';

const initData: any = {
    data: [],
    loading: false
};
const getListPartnerReducer = (state = initData, action: IAction): IGetListResp<IPartner> => {
    switch (action.type) {
        case GET_LIST_PARTNER.REQUEST:
            return { ...state, data: [], loading: true };
        case GET_LIST_PARTNER.SUCCESS:
            const { data } = action.payload;
            return { ...state, data, loading: false };
        case GET_LIST_PARTNER.FAILURE:
            return { ...state, loading: false };
        default:
            return state;
    }
}

const getListCountryReducer = (state = initData, action: IAction): IGetListResp<IPartner> => {
    switch (action.type) {
        case GET_LIST_COUNTRY.REQUEST:
            return { ...state, data: [], loading: true };
        case GET_LIST_COUNTRY.SUCCESS:
            const { data } = action.payload;
            return { ...state, data, loading: false };
        case GET_LIST_COUNTRY.FAILURE:
            return { ...state, loading: false };
        default:
            return state;
    }
}

export { getListPartnerReducer, getListCountryReducer }