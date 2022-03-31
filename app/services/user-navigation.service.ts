/**
 * @owner BlueSky
 * @description Handle business logic for UserNavigation Object
 * @since 1.0.0
 * @date Nov 09, 2020
 * @contributors
 *      Phat Le <phat.le@ccintegration.com>
 */
import UserNavigationRepository from '../repositories/user-navigation.repository';
import BaseService, { IService } from './base.service';

export interface IUserNavigationService extends IService { }

export default class UserNavigationService extends BaseService implements IUserNavigationService {
    constructor(repository: UserNavigationRepository) {
        super(repository);
    }
}