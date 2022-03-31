/**
 * @owner BlueSky
 * @description Handle business logic
 * @since 1.0.0
 * @date Feb 8, 2022
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 */


import CAPIHandler from '../lib/api.lib';
import { CustomResponse } from '../../../interfaces/custom-response.interface';
export interface ILabelService {
    pullLabels(params: ISearchParams): Promise<CustomResponse>;
}

export default class LabelService implements ILabelService {
    constructor() {
    }

    async pullLabels(params: ISearchParams) {
        const clabelAPI = new CAPIHandler();
        return clabelAPI.pullLabels(params);
    }
}