/**
 * @owner BlueSky
 * @description Handle business logic for dashboard Object
 * @since 1.0.0
 * @date Apr 06, 2020
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 */
import BaseService, { IService } from './base.service';
import { IDashboardRepository } from '../repositories/dashboard.repository';

import PartnerService from './partner.service';
import partnerRepository from '../repositories/partner.repository';
// import { CustomResponse } from '../interfaces/custom-response.interface';

export interface IDashboardService extends IService { }

export default class DashboardService extends BaseService implements IDashboardService {
    repository: IDashboardRepository;
    partnerService: PartnerService
    constructor(repository: IDashboardRepository) {
        super(repository);
        this.partnerService = new PartnerService(new partnerRepository);
    }
}