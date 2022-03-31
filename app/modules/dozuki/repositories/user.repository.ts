/**
 * @owner BlueSky
 * @description Define manipulations onto collection
 * @since 1.0.0
 * @date Jan 12, 2022
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import DozukiUser from '../models/user.model';
import BaseRepository, { IRepository } from '../../../repositories/base.repository';

export interface IDozukiUserRepository extends IRepository { }
export default class DozukiUserRepository extends BaseRepository implements IDozukiUserRepository {
    constructor() {
        super(DozukiUser, null);
    }
}