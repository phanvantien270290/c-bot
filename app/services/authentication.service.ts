/**
 * @owner BlueSky
 * @description 
 * @since 1.0.0
 * @date Jan 21, 2021
 * @contributors
 *      Phat Le <phat.le@ccintegration.com>
 */
import AuthenticationRepository from '../repositories/authentication.repository';
import BaseService, { IService } from './base.service';
import { CustomResponse } from '../interfaces/custom-response.interface';
import APIHandler from '../cores/lib/axios.lib';
import Session from '../cores/lib/session.lib';
import { Helper } from '../utils/helper.util';
import dotenv from 'dotenv';
dotenv.config();

export interface IAuthenticationService extends IService {
    authenticateViaProvider(username: string, password: string): Promise<CustomResponse>;
    kickOutOfProvider(username: string, token: string, account: string): Promise<CustomResponse>;
}

export default class AuthenticationService extends BaseService implements IAuthenticationService {
    constructor(repository: AuthenticationRepository) {
        super(repository);
    }

    async validateToken(providerToken: string, rawCookie: string) {
        const response: CustomResponse = {
            status: false,
            data: null
        }
        const providerAPI = `${process.env.PROVIDER_HOST}/api/auth/validatetoken`;
        const result = await APIHandler.post(providerAPI, {
            token: providerToken,
            cookie: rawCookie
        });
        const resultData = result.data;
        if (resultData.status && resultData.data) {
            const user: IUser = {
                accountName: resultData.data.username,
                name: resultData.data.name,
                email: resultData.data.email,
                providerToken: resultData.data.token
            }
            const session = new Session();
            user.token = await session.set(user);
            response.status = resultData.status;
            response.data = user;
        }
        return response;
    }

    async authenticateViaProvider(username: string, password: string) {
        const res: CustomResponse = {
            status: false
        };
        const providerAPI = `${process.env.PROVIDER_HOST}/api/auth`;
        const result = await APIHandler.post(providerAPI, { loginname: username, password: Helper.encrypt(password, 'ccicore2-keynote') });

        if (result.data) {
            res.status = result.data.authenticated;
            res.msg = result.data.message;
        } else {
            res.msg = result.msg;
        }
        if (res.status) {
            const user: IUser = {
                accountName: username,
                name: result.data.name,
                email: result.data.email,
                providerToken: result.data.token
            };
            const session = new Session();
            user.token = await session.set(user);
            res.data = user;
        }
        return res;
    }

    async kickOutOfProvider(username: string, rawCookie: any, token: string) {
        const providerAPI = `${process.env.PROVIDER_HOST}/api/oviot/auth/logout`;
        const result = await APIHandler.post(providerAPI, {
            account: username,
            cookie: rawCookie
        });
        const res: CustomResponse = {
            status: result.data.status,
            msg: result.data.message
        };
        if (res.status) {
            const session = new Session();
            session.destroy(token);
        }
        return res;
    }
}