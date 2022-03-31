/**
 * @owner BlueSky
 * @description Handle business logic for Partner Object
 * @since 1.0.0
 * @date Mar 27, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import BaseService, { IService } from './base.service';
import { IRepository } from '../repositories/base.repository';
import { CustomResponse } from '../interfaces/custom-response.interface';

export interface IPartnerService extends IService {
    countCustomersGroupByStatus(query: IQuery): Promise<CustomResponse>;

}

export default class PartnerService extends BaseService implements IPartnerService {
    constructor(repository: IRepository) {
        super(repository);
    }

    countCustomersGroupByStatus(query: IQuery) {
        const pipeLineQuery = { deleted: false, ...query  };

        return this.count(pipeLineQuery);
    }
}