/**
 * @owner BlueSky
 * @description Define manipulations onto User Mapping collection
 * @since 1.0.0
 * @date Nov 09, 2020
 * @contributors
 *      Phat Le <phat.le@ccintegration.com>
 */
import UserModel from '../models/external/user-external.model';
import BaseRepository from './base.repository';

export default class UserMappingRepository extends BaseRepository {
    constructor() {
        super(UserModel, null);
    }
}