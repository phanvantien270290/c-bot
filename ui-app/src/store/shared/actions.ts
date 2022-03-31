/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date July 27, 2020
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 */

import { createRequestTypes } from '../../utils/helper';

export const GET_LIST_PARTNER = createRequestTypes('PartnerCombobox::GETLIST');
export const GET_LIST_COUNTRY = createRequestTypes('Country::GETLIST');
export function getListPartners(params?: any, type: string = GET_LIST_PARTNER.REQUEST) {
    return {
        type,
        params
    };
}
export function getListCountry(params?: any, type: string = GET_LIST_COUNTRY.REQUEST) {
    return {
        type,
        params
    };
}
