/**
 * @owner BlueSky
 * @description Define an Abstraction controller
 * @since 1.0.0
 * @date Mar 22, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { Request, Response } from "express";
import { IService } from '../services/base.service';
import JWTHandler from '../cores/lib/json-web-token.lib';
import { API_TOKEN_SECRET } from '../config/app.config';
import AuthMiddleware from '../middlewares/auth.middleware';
import { ObjectId } from 'mongodb';
import Session from '../cores/lib/session.lib';

export default class BaseController {
    service: IService;
    authMiddleware: AuthMiddleware;
    constructor(service: IService) {
        this.service = service;
        this.authMiddleware = new AuthMiddleware();
    }

    private retrieveToken(req: Request): string {
        // Express headers are auto converted to lowercase
        let token: any = req.headers['x-access-token'] || req.headers['authorization'];
        if (token && token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }
        return token;
    }

    async getCurrentAccount(req: Request): Promise<IUser> {
        const token = this.retrieveToken(req);
        if (token) {
            const session = new Session();
            const users: IUser[] = await session.getCurrents(token);
            if (users.length && users[0]) {
                return users[0];
            }
        }
        return null;
    }

    getParameters(req: Request): ISearchParams {
        let params: ISearchParams = {};
        if (req.query && Object.keys(req.query).length) {
            params = { ...params, ...req.query };

            params.options = params.options && JSON.parse(String(params.options));
            params.searchFields = params.searchFields && JSON.parse(String(params.searchFields));
            params.fields = params.fields && JSON.parse(String(params.fields));
        } else if (req.body && Object.keys(req.body).length) {
            params = { ...params, ...req.body };
        } else if (req.params && Object.keys(req.params).length) {
            params = { ...params, ...req.params };
        }

        if (params.options && Object.keys(params.options).length) {
            const { page, limit, sort } = params.options;
            if (limit) {
                params.options.start = +page * +limit;
                params.options.limit = +limit;
            }

            if (sort) {
                for (const field in sort) {
                    sort[field] = (typeof sort[field] === 'string' && sort[field].toLowerCase() === 'asc') ? 1 : -1;
                }
                params.options.sort = sort;
            }
        }

        if (params._id) {
            params.searchFields = params.searchFields || {};
            params.searchFields._id = new ObjectId(params._id);
        }

        this.service?.setUserToken(this.retrieveToken(req));

        return params;
    }

    /**
     * @description To verify the authentication for calling API from external apps 
     * @deprecated
     * @param req 
     * @param res 
     * @param next 
     */
    authenticate(req: Request, res: Response, next) {
        const iJWT = new JWTHandler(API_TOKEN_SECRET);
        let token: any = this.retrieveToken(req);
        if (!token) {
            token = this.getParameters(req).token;
        }

        if (!token) {
            res.status(401).send('Authentication error. Token required.');
        } else {
            const valid: any = iJWT.verify(token);
            if (valid.message) {
                res.status(401).send('Authentication error. Token is invalid.');
            } else {
                next();
            }
        }
    }

    /**
     * @description To verify the authentication for calling API from external apps
     * @param req 
     * @param res 
     * @param next 
     * @returns 
     */
    authenticateNew(req: Request, res: Response, next) {
        return this.authMiddleware.authenticate4Api(req, res, next);
    }

    find(req: Request, res: Response) {
        const { searchFields, options } = this.getParameters(req);
        this.service.find(searchFields, options)
            .then(resp => {
                res.status(200).send(resp);
            });
    }

    retrieve(req: Request, res: Response) {
        const { searchFields, options } = this.getParameters(req);
        this.service.retrieve(searchFields, options)
            .then(resp => {
                res.status(200).send(resp);
            });
    }

    save(req: Request, res: Response) {
        const params: any = this.getParameters(req),
            data = params.data || {};
        this.service.save(data)
            .then(resp => {
                res.status(200).send(resp);
            });
    }

    remove(req: Request, res: Response) {
        const { searchFields } = this.getParameters(req);
        this.service.remove(searchFields)
            .then(resp => {
                res.status(200).send(resp);
            });
    }

    update(req: Request, res: Response) {
        const { _id, searchFields, data, options } = this.getParameters(req);

        if (_id) {
            this.service.updateOne({ _id }, data, options)
                .then(resp => res.status(200).send(resp));
        } else if (searchFields) {
            this.service.update(searchFields, data, options)
                .then(resp => res.status(200).send(resp));
        } else {
            res.status(200).send({
                msg: 'Data not found to update',
                status: false
            });
        }
    }

    deleteOne(req: Request, res: Response) {
        const { searchFields } = this.getParameters(req);

        this.service.deteleOne(searchFields, true)
            .then(resp => {
                res.status(200).send(resp);
            })
            .catch(err => {
                res.status(500).send({
                    status: false,
                    msg: err ? err.message : 'Something went wrong'
                });
            });
    }
}