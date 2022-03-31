/**
 * @owner BlueSky
 * @description Handle business logic for Country Object
 * @since 1.0.0
 * @date Nov 12, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import CountryRepository from '../repositories/country.repository';
import BaseService, { IService } from './base.service';

export interface ICountryService extends IService { }
export default class CountryService extends BaseService implements ICountryService {
    constructor(repository: CountryRepository) {
        super(repository);
    }
}