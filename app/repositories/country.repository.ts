/**
 * @owner BlueSky
 * @description Define manipulations onto Country collection
 * @since 1.0.0
 * @date Nov 12, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import Country from '../models/country.model';
import BaseRepository from './base.repository';

export default class CountryRepository extends BaseRepository {
    constructor() {
        super(Country, null);
    }
}