/**
 * @owner BlueSky
 * @description Define manipulations onto Partner collection
 * @since 1.0.0
 * @date Mar 26, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import Partner from '../models/partner.model';
import BaseRepository from './base.repository';

export default class PartnerRepository extends BaseRepository {
    constructor() {
        super(Partner, null);

    }
}