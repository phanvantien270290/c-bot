/**
 * @owner BlueSky
 * @description Dozuki Guide task
 * @since 1.0.0
 * @date Jan 20, 2022
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

import { Helper } from "../../../utils/helper.util";
import { getUnixTime } from 'date-fns';
import { Logger } from '../../../utils/logger.util';
import DAPIHandler from "../lib/api.lib";
import GuideService from "../services/guide.service";
import GuideRepository from "../repositories/guide.repository";

export const fetchAll = async () => {
    let page = 1;
    const dozuki = new DAPIHandler();
    const dozukiService = new GuideService(new GuideRepository());
    while (page > 0) {
        const pagingOffset = Helper.getPagingOffset(page, 200);
        const res = await dozuki.pullGuides({ ...pagingOffset, includePrivate: true });
        if (!res.status || (res.data && !res.data.length)) {
            Logger.info(`Guide fetchAll ended with message: ${res.msg || 'No data'}`, new Date());
            page = -1;
            continue;
        }
        dozukiService.save(res.data, {});
        page++;
    }
}

export const dailyFetch = async () => {
    const dozukiService = new GuideService(new GuideRepository());
    let page = 1;
    const unixTime = getUnixTime(new Date(`${new Date().toDateString()} 00:00:00`));
    const dozuki = new DAPIHandler();
    const criteria = {
        modifiedSince: unixTime,
        order: 'DESC'
    };
    while (page > 0) {
        const pagingOffset = Helper.getPagingOffset(page, 200);
        const res = await dozuki.pullGuides({ ...pagingOffset, ...criteria });
        if (!res.status || (res.data && !res.data.length)) {
            Logger.info(`Guide dailyFetch ended with message: ${res.msg ?? 'No data'}`, new Date());
            page = -1;
            continue;
        }

        for (const guide of res.data) {
            dozukiService.findAndUpdate({ guideid: guide.guideid }, guide, { upsert: true });
        }

        page++;
    }
}

const GuideTasks = {
    fetchAll, dailyFetch
};
export default GuideTasks;