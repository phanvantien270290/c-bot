/**
 * @owner BlueSky
 * @description 
 * @since 1.0.0
 * @date Jan 12, 2022
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import CategoryRepository from './repositories/category.repository';
import GuideRepository from './repositories/guide.repository';
import WorklogRepository from './repositories/worklog.repository';
import CategoryService from './services/category.service';
import GuideService from './services/guide.service';
import WorklogService from './services/worklog.service';

export default class Dozuki {
    category: CategoryService;
    guide: GuideService;
    worklog: WorklogService;
    constructor() {
        this.category = new CategoryService(new CategoryRepository());
        this.guide = new GuideService(new GuideRepository());
        this.worklog = new WorklogService(new WorklogRepository());
    }
}