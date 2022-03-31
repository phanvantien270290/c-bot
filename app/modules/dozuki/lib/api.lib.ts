/**
 * @owner BlueSky
 * @description Define a Dozuki API handler
 * @since 1.0.0
 * @date Jan 12, 2022
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import APIHandler from "../../../cores/lib/axios.lib";
import { formatUriPath } from '../../../utils/helper.util';
import { CustomResponse } from '../../../interfaces/custom-response.interface';
import { Logger } from '../../../utils/logger.util';

export default class DAPIHandler {
    private token: string;
    private host: string;
    // private maxLimit: number = 200;
    constructor() {
        this.host = process.env.DOZUKI_HOST || null;
        this.token = process.env.DOZUKI_API_TOKEN || null;
    }

    async pullGuides(params: any) {
        return this.pull(params, '/guides');
    }

    async pullCategories(params: any) {
        const res = await this.pull(params, `/categories/all`);
        if (!res.status) {
            throw new Error(res.msg);
        }
        const catList = [];
        for (const cat of res.data) {
            const resp = await this.pull(null, `/categories/${cat}`);
            if (!resp.status) continue;
            catList.push(resp.data);
        }

        return {
            status: true,
            data: catList
        } as CustomResponse;
    }

    async pullWorkLogs(params: any) {
        return this.pull(params, '/work_log');
    }

    async pullUsers(params: any) {
        return this.pull(params, '/users');
    }

    private async requestToken() {
        if (this.token) {
            return;
        }

        const endpoint = this.getEndpoint('/user/token');
        const posted = {
            email: process.env.DOZUKI_API_ACCOUNT,
            password: process.env.DOZUKI_API_PWD
        };

        const res = await APIHandler.post(endpoint, posted);
        Logger.info('Dozuki API Login', res);
        if (!res.status || !res.data || !res.data.authToken) {
            throw new Error(res.msg || `Permission is denied.`);
        }
        this.token = res.data.authToken;
    }

    private async pull(params: any, path: string): Promise<CustomResponse> {
        await this.requestToken();
        const headers = {
            Authorization: `api ${this.token}`
        };
        const endpoint = this.getEndpoint(path);

        return APIHandler.get(endpoint, params, headers);
    }

    private getEndpoint(path: string) {
        return `${this.host}/api/${process.env.DOZUKI_API_VERSION}/${formatUriPath(path)}`;
    }
}