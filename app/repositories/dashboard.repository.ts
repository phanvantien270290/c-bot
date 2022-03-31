/**
 * @owner BlueSky
 * @description Define Dashboard
 * @since 1.0.0
 * @date Oct 22, 2020
 * @contributors
 *      Phan V Tien <tien.phan@ccintegration.com>
 */
 import BaseRepository, { IRepository } from './base.repository';
 
 export interface IDashboardRepository extends IRepository {
 }
 export default class DashboardRepository extends BaseRepository implements IDashboardRepository {
     constructor() {
         super(null);
     }
 }