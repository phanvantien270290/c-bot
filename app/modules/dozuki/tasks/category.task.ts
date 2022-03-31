/**
 * @owner BlueSky
 * @description Dozuki Category task
 * @since 1.0.0
 * @date Jan 20, 2022
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import DAPIHandler from "../lib/api.lib";
import { Helper } from "../../../utils/helper.util";
import { Logger } from '../../../utils/logger.util';
import CategoryService from "../services/category.service";
import CategoryRepository from "../repositories/category.repository";
import { BulkWriteOperation } from "mongodb";

export const fetchAll = async () => {
    let page = 1;
    const dozuki = new DAPIHandler();
    const dozukiService = new CategoryService(new CategoryRepository());
    while (page > 0) {
        const pagingOffset = Helper.getPagingOffset(page, 200);
        const res = await dozuki.pullCategories(pagingOffset);
        if (!res.status || !res.data || !res.data.length) {
            Logger.info(`Category fetchAll ended with message: ${res.msg || 'No data'}`, new Date());
            page = -1;
            continue;
        }
        dozukiService.save(res.data, {});
        page++;
    }
}

export const dailyFetch = async () => {
    const dozukiService = new CategoryService(new CategoryRepository());
    let page = 1;
    const dozuki = new DAPIHandler();

    while (page > 0) {
        const pagingOffset = Helper.getPagingOffset(page, 200);
        const res = await dozuki.pullCategories({ ...pagingOffset });
        if (!res.status || !res.data || !res.data.length) {
            Logger.info(`Category dailyFetch ended with message: ${res.msg || 'No data'}`, new Date());
            page = -1;
            continue;
        }

        const bulkOps: BulkWriteOperation<any>[] = [];
        for (const cat of res.data) {
            bulkOps.push({
                updateOne:
                {
                    filter: { wikiid: cat.wikiid },
                    update: { $set: cat },
                    upsert: true
                }
            });
        }

        (bulkOps.length) ? await dozukiService.bulkWrite(bulkOps, { ordered: false }) : null;
        page++;
    }
}

const CategoryTasks = {
    fetchAll, dailyFetch
};
export default CategoryTasks;