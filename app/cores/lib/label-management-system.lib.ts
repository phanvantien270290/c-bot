/**
 * @owner BlueSky
 * @description Define Label Management System API library
 * @since 1.0.0
 * @date Mar 29, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import APIHandler from "./axios.lib";
import CSVHandler from './csv.lib';
import { formatUriPath, StringHelper } from '../../utils/helper.util';
import { LMS_API_DATA_MODE as MODE, HTTP } from '../../utils/enum.util';
import { CustomResponse } from '../../interfaces/custom-response.interface';

export default class LMSHandler {
    uri: string;
    constructor(private host: string, private port: number = 56425, private path: string = '') {
        this.uri = this.getURI();
    }

    connect(): void {

    }

    async print(data: any, mode?: MODE | string): Promise<CustomResponse> {
        let str: string = await CSVHandler.fromJson(data);
        if (mode === MODE.JSON) {
            str = JSON.stringify(data, null, 4);
        }
        let result = await APIHandler.post(this.uri, str);
        if (this.isBaseError(result.errno)) {
            this.setHost(process.env.LMS_HOST_BACKUP);
            const errmsg = `${result.msg}. Redirect to ${process.env.LMS_HOST_BACKUP}`;
            const errno = result.errno;

            result = await APIHandler.post(this.uri, str);
            result.msg = errmsg;
            result.errno = errno;
        }

        return this.extractLMSResponse(result);
    }

    async calibrate4Printers(query: IQuery) {
        let result = await APIHandler.post(this.uri, query);
        if (this.isBaseError(result.errno)) {
            this.setHost(process.env.LMS_HOST_BACKUP);
            const errmsg = `${result.msg}. Redirect to ${process.env.LMS_HOST_BACKUP}`;
            const errno = result.errno;

            result = await APIHandler.post(this.uri, query);
            result.msg = errmsg;
            result.errno = errno;
        }
        return this.extractLMSResponse(result);
    }

    setHost(host: string) {
        this.host = host;
        this.uri = this.getURI();
    }

    setPort(port: number) {
        this.port = port;
        this.uri = this.getURI();
    }

    setPath(path: string) {
        this.path = path;
        this.uri = this.getURI();
    }

    private getURI() {
        return `${this.host}:${this.port}/${formatUriPath(this.path)}`;
    }

    private isBaseError(errno: any) {
        return process.env.LMS_HOST_BACKUP &&
            [
                HTTP.ERR_CONN_REFUSED,
                HTTP.ERR_TIMED_OUT,
                HTTP.ERR_NOT_FOUND
            ].indexOf(errno) >= 0
    }

    private extractLMSResponse(response: CustomResponse) {
        const res: CustomResponse = {
            status: response.status,
            msg: response.msg
        };

        // Handle error from LMS
        if (StringHelper.isString(response.data)) {
            let _msg = response.data.match(/("error": \".*\",)/gi);
            if (_msg) {
                _msg = _msg[0].substr(10);
                response.data = {
                    status: 'False',
                    error: _msg
                }
            }
        }

        if (response.data && response.data.status === 'False') {
            res.status = false;
            res.msg = response.data.error;
        }

        return res;
    }
}