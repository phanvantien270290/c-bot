/**
 * @owner BlueSky
 * @description Define manipulations onto Label collection
 * @since 1.0.0
 * @date Nov 09, 2020
 * @contributors
 *      Phat Le <phat.le@ccintegration.com>
 */
import UserNavigation from '../models/user-navigation.model';
import BaseRepository from './base.repository';

export default class UserNavigationRepository extends BaseRepository {
    constructor() {
        super(UserNavigation, null);
    }
}