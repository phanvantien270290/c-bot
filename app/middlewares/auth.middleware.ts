/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date May 09, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

import { Request, Response } from 'express';
import { CustomResponse } from '../interfaces/custom-response.interface';
import APITokenService from '../services/api-token.service';
import APITokenRepository from '../repositories/api-token.repository';
import APITokenModel from '../models/api-token.model';
import Session from '../cores/lib/session.lib';
import { StringHelper } from '../utils/helper.util';
import { MSG } from '../utils/message.util';
import APIHandler from "../cores/lib/axios.lib";

export default class AuthMiddleware {
    private service: APITokenService
    constructor() {
        this.service = new APITokenService(new APITokenRepository());
    }

    private retrieveToken(req: Request): string {
        // Express headers are auto converted to lowercase
        let token: any = req.headers['x-access-token'] || req.headers['authorization'];
        if (token && token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }
        return token;
    }

    async authenticate4Api(req: Request, res: Response, next) {
        const token = this.retrieveToken(req),
            resp: CustomResponse = {
                status: false
            };
        if (!token) {
            resp.msg = 'Authentication error. Token required.';
        } else {
            const apires = await this.service.retrieve({ token, obsoleted: false, deleted: false });
            if (apires.data) {
                const api = new APITokenModel(apires.data);
                const result = api.verifyToken(token);
                if (result.message) {
                    resp.msg = 'Authentication error. Token is invalid / expired.';
                }
            } else {
                resp.msg = apires.msg;
            }
        }

        if (resp.msg) {
            res.status(401).send(resp);
        } else {
            next();
        }
    }

    async authenticate4App(req: Request, res: Response, next) {
        const host = req.headers.host;
        const IGNORED_API = [
            '/api/auth/signin',
            '/api/auth/signout',
            '/api/auth/channel',
            '/api/auth/sso'
        ];
        // Ignore external APIs
        const passed = (new RegExp(`(\/${process.env.APP_API_VERSION}\/)`)).test(req.path);

        const token = this.retrieveToken(req),
            resp: CustomResponse = {
                status: false
            };

        if (host === `localhost:${process.env.APP_PORT}`
            || IGNORED_API.indexOf(StringHelper.trim(decodeURIComponent(req.path))) >= 0
            || passed
        ) {
            next();
            return;
        }

        if (!token) {
            resp.msg = MSG.ERROR_CODE['404'];
        } else {
            try {
                const session = new Session();
                const isAliveSession = await session.validate(token);
                if (!isAliveSession) {
                    const providerToken = req.cookies['APISID'] || '';
                    const result = await APIHandler.post(`${process.env.PROVIDER_HOST}/api/auth/validatetoken`, {
                        token: providerToken,
                        cookie: req.headers.cookie
                    });
                    if (result.data && !result.data.status) {
                        resp.msg = MSG.ERROR_CODE['403'];
                    } else {
                        session.update(token);
                    }
                }
            } catch (error) {
                resp.msg = error.message;
            }
        }

        if (resp.msg) {
            resp.auth_code = 401;
            res.status(201).send(resp);
        } else {
            next();
        }
    }
}