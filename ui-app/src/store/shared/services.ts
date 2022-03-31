
/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date July 27, 2020
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 */

import { download, getApi, postApi } from '../../services/api';

export const servicesAPI = {
    getPartnerCombobox: '/api/partner/combobox',
    printLabel: '/api/label/print',
    saveLabel: '/api/label/save',
    uploadFile: '/api/file/upload',
    country: '/api/country/find',
    exportExcel: '/api/file/exportexcel',
    saveItemMaster: '/api/item/save'
}

const fetchPartnerCombobox = (params: any) => {
    return getApi(servicesAPI.getPartnerCombobox, params);
}
const printLabel = (params: any) => {
    return postApi(servicesAPI.printLabel, params);
}
const exportExcel = (paramsStr: string) => {
    return download(`${servicesAPI.exportExcel}?${paramsStr}`);
}
const fetchCountry = (params: any) => {
    return getApi(servicesAPI.country, params);
}
export {
    fetchPartnerCombobox,
    printLabel,
    exportExcel,
    fetchCountry
}