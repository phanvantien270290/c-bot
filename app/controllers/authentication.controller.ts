/**
 * @owner BlueSky
 * @description ...
 * @since 1.0.0
 * @date Jan 21, 2021
 * @contributors
 *      Phat Le <phat.le@ccintegration.com>
 */

import BaseController from "./base.controller";
import { Request, Response } from 'express';
import AuthenticationService from "../services/authentication.service";

export default class AuthenticationController extends BaseController {
    service: AuthenticationService;
    constructor(service: AuthenticationService) {
        super(service);
    }

    authChannelToken(req: Request, res: Response) {
        const { _token } = this.getParameters(req);
        if (!_token) {
            res.status(200).send({status: false, msg: 'Empty token!'});
        }
        const _data = JSON.parse(_token) // APISID;
        let d = new Date(),
            year = d.getFullYear(),
            month = d.getMonth(),
            day = d.getDate(),
            expireTime = new Date(year + 2, month, day);
        for (const i in _data) {
            res.cookie(i, _data[i], { expires: expireTime });
        }
        res.send();
    }
    authSSO(req: Request, res: Response) {
        const providerToken = req.cookies['APISID'] || req.body.token || '';
        const rawCookie = req.headers.cookie;
        if (!providerToken || providerToken === '') {
            res.status(200).send({status: false, msg: 'Token is required'});
        } else {
            this.service.validateToken(providerToken, rawCookie)
            .then(resp => {
                res.status(200).send(resp);
            })
            .catch(reason => {
                res.status(200).send(reason);
            })
        }
    }
    signIn(req: Request, res: Response) {
        const { username, password } = this.getParameters(req);
        this.service.authenticateViaProvider(username, password)
            .then(resp => {
                res.status(200).send(resp);
            })
            .catch(reason => {
                res.status(200).send(reason);
            })
    }

    signOut(req: Request, res: Response) {
        const { account, token } = this.getParameters(req);
        this.service.kickOutOfProvider(account, req.headers.cookie, token)
            .then(resp => {
                if (resp.status) {
                    for (const i in req.cookies) {
                        res.clearCookie(i);
                    }
                }
                res.status(200).send(resp);
            })
            .catch(reason => {
                res.status(200).send(reason);
            })
    }
}