/**
 * @owner BlueSky
 * @description Define manipulations onto API Token collection
 * @since 1.0.0
 * @date Mar 27, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import APIToken from '../models/api-token.model';
import BaseRepository from './base.repository';

export default class APITokenRepository extends BaseRepository {
    constructor() {
        super(APIToken, null);
    }
}