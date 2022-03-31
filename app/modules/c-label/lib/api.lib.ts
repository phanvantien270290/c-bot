/**
 * @owner BlueSky
 * @description Handle business logic
 * @since 1.0.0
 * @date Feb 8, 2022
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 */
import { formatUriPath } from "../../../utils/helper.util";
import APIHandler from "../../../cores/lib/axios.lib";
import { CustomResponse } from '../../../interfaces/custom-response.interface';
import { Method } from "axios";

export default class CAPIHandler {
    private host: string;
    private version: string;
    private token: string;
    constructor() {
        this.host = process.env.CLABEL_API_HOST || null;
        this.token = process.env.CLABEL_API_TOKEN || null;
        this.version = process.env.CLABEL_API_VERSION || 'v1.0';
    }

    async pullLabels(params: ISearchParams) {
        return this.pull(params, `/label/${this.version}/get-list`, 'POST');
    }

    private async pull(params: ISearchParams, path: string, method: Method): Promise<CustomResponse> {
        const endpoint = this.getEndpoint(path);
        const headers = { authorization: this.token };
        const res = method === 'POST' ? await APIHandler.post(endpoint, params, headers) : await APIHandler.get(endpoint, params, headers);
        if (res.status) {
            return res.data;
        }
        return res;
    }

    private getEndpoint(path: string) {
        return `${this.host}/api/${formatUriPath(path)}`;
    }
}