/**
 * @owner BlueSky
 * @description Handle business logic for API Token Object
 * @since 1.0.0
 * @date Mar 27, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import APITokenRepository from '../repositories/api-token.repository';
import BaseService, { IService } from './base.service';

import dotenv from 'dotenv';
dotenv.config();

export interface IAPITokenService extends IService {}
export default class APITokenService extends BaseService implements IAPITokenService {
    constructor(repository: APITokenRepository) {
        super(repository);
    }
}