/**
 * @owner BlueSky
 * @description Define manipulations onto collection
 * @since 1.0.0
 * @date Jan 12, 2022
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import Worklog from '../models/worklog.model';
import BaseRepository, { IRepository } from '../../../repositories/base.repository';

export interface IWorklogRepository extends IRepository { }
export default class WorklogRepository extends BaseRepository implements IWorklogRepository {
    constructor() {
        super(Worklog, null);
    }
}