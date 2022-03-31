/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date Apr 12, 2020
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 */

import { getApi } from '../../../services/api';
export const worklogAPI = {
    retrieve: 'api/dozuki/worklogs/list',
}
const retrieveWorklogs = (params: ICRUDParameter) => {
    return getApi(worklogAPI.retrieve, params);

}
export {
    retrieveWorklogs
}