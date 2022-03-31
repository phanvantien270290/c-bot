/**
 * @owner BlueSky
 * @description Define AXIOS Handler library <https://github.com/axios/axios>
 * @since 1.0.0
 * @date Apr 06, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

import https from 'https';
import Axios, { Method, ResponseType } from "axios";
import { CustomResponse } from '../../interfaces/custom-response.interface';
import { HTTP } from '../../utils/enum.util';
import { Logger } from '../../utils/logger.util';

export default class APIHandler {
    /**
     * Create a resource
     * @param url 
     * @param data 
     */
    static post(url: string, data: any, headers = null, tls: Boolean = true): Promise<CustomResponse> {
        return this.request(url, data, "POST", headers, tls);
    }

    /**
     * Update/Create a resource by overriding itself
     * @param url 
     * @param data 
     */
    static put(url: string, data: any, headers = null, tls: Boolean = true): Promise<CustomResponse> {
        return this.request(url, data, "PUT", headers, tls);
    }

    /**
     * A partial update to a resource
     * @param url 
     * @param data 
     */
    static patch(url: string, data: any, headers = null, tls: Boolean = true): Promise<CustomResponse> {
        return this.request(url, data, "PATCH", headers, tls);
    }

    /**
     * Get a resource
     * @param url 
     * @param params 
     */
    static get(url: string, params: any, headers = null, tls: Boolean = true): Promise<CustomResponse> {
        return this.request(url, params, "GET", headers, tls);
    }

    /**
     * Delete resource
     * @param url 
     * @param params 
     */
    static delete(url: string, params: any, headers = null, tls: Boolean = true): Promise<CustomResponse> {
        return this.request(url, params, "DELETE", headers, tls);
    }

    /**
     * Get metadata of a resource
     * @param url 
     * @param params 
     */
    static head(url: string, params: any, headers = null, tls: Boolean = true): Promise<CustomResponse> {
        return this.request(url, params, "HEAD", headers, tls);
    }

    /**
     * 
     * @param url 
     * @param params 
     */
    static options(url: string, params: any, headers = null, tls: Boolean = true): Promise<CustomResponse> {
        return this.request(url, params, "OPTIONS", headers, tls);
    }

    private static request(
        url: string, parameter: any, method: Method = "GET",
        headers = null, tls: Boolean = true, responseType: ResponseType = "json"): Promise<CustomResponse> {
        const methodIndex = ['PUT', 'POST', 'PATCH'].indexOf(method);
        const httpsAgent = tls ? undefined : new https.Agent({ rejectUnauthorized: false });

        return new Promise(resolve => {
            Axios.request({
                url,
                method,
                params: methodIndex < 0 ? parameter : {},
                data: methodIndex >= 0 ? parameter : {},
                headers: headers || undefined,
                httpsAgent,
                // adapter?: AxiosAdapter;
                // auth?: AxiosBasicCredentials;
                responseType,
                // xsrfCookieName?: string;
                // xsrfHeaderName?: string;
                // onUploadProgress?: (progressEvent: any) => void;
                // onDownloadProgress?: (progressEvent: any) => void;
            }).then(res => {
                resolve({ data: res.data, status: true });
            }).catch(reason => {
                Logger.error(`API called error: ${reason?.message}`, reason);
                const errno = reason.response?.status === 404 ? HTTP.ERR_NOT_FOUND : '';
                resolve({ status: false, msg: reason.message, errno: reason.errno || errno });
            })
        });
    }
}