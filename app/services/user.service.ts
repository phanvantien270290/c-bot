/**
 * @owner BlueSky
 * @description Handle business logic for User Mapping Object
 * @since 1.0.0
 * @date Nov 09, 2020
 * @contributors
 *      Phat Le <phat.le@ccintegration.com>
 */
import BaseService, { IService } from './base.service';
import UserRepository from '../repositories/user.repository';

export interface IUserService extends IService { }

export default class UserService extends BaseService implements IUserService {
    constructor(repository: UserRepository) {
        super(repository);
    }
}