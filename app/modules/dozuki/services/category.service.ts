/**
 * @owner BlueSky
 * @description Handle business logic
 * @since 1.0.0
 * @date Jan 12, 2022
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { ICategoryRepository } from '../repositories/category.repository';
import BaseService, { IService } from '../../../services/base.service';
import DozukiAPIHandler from '../lib/api.lib';
import { CustomResponse } from '../../../interfaces/custom-response.interface';
import { FilterOption } from '../../../interfaces/mongo-option/filter-option.interface';

export interface ICategoryService extends IService {
    pull(criteria: IQuery): Promise<CustomResponse>;
}

export default class CategoryService extends BaseService implements ICategoryService {
    repository: ICategoryRepository;
    constructor(repository: ICategoryRepository) {
        super(repository);
    }

    async pull(criteria: IQuery, option: FilterOption = {}) {
        const dozukiAPI = new DozukiAPIHandler();
        const res = await dozukiAPI.pullCategories(criteria);
        if (!res.status) {
            return res;
        }
        return this.save(res.data, option);
    }
}