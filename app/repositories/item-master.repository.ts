/**
 * @owner BlueSky
 * @description Define manipulations onto Label collection
 * @since 1.0.0
 * @date Mar 26, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import ItemMaster from '../models/item-master.model';
import BaseRepository from './base.repository';

export default class ItemMasterRepository extends BaseRepository {
    constructor() {
        super(ItemMaster, null);
    }
}