/**
 * @owner BlueSky
 * @description Define manipulations onto collection
 * @since 1.0.0
 * @date Jan 12, 2022
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import Guide from '../models/guide.model';
import BaseRepository, { IRepository } from '../../../repositories/base.repository';

export interface IGuideRepository extends IRepository { }
export default class GuideRepository extends BaseRepository implements IGuideRepository {
    constructor() {
        super(Guide, null);
    }
}