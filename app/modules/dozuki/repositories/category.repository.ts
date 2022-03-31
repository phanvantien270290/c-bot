/**
 * @owner BlueSky
 * @description Define manipulations onto collection
 * @since 1.0.0
 * @date Jan 12, 2022
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import Category from '../models/category.model';
import BaseRepository, { IRepository } from '../../../repositories/base.repository';

export interface ICategoryRepository extends IRepository { }
export default class CategoryRepository extends BaseRepository implements ICategoryRepository {
    constructor() {
        super(Category, null);
    }
}