/**
 * @owner BlueSky
 * @description Dozuki Guide task
 * @since 1.0.0
 * @date Jan 20, 2022
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import DAPIHandler from "../lib/api.lib";
import { Helper, DateHelper } from "../../../utils/helper.util";
import { Logger } from '../../../utils/logger.util';
import UserService from "../services/user.service";
import UserRepository from "../repositories/user.repository";

export const fetchAll = async () => {
    let page = 1;
    const dozuki = new DAPIHandler();
    const dozukiService = new UserService(new UserRepository());
    while (page > 0) {
        const pagingOffset = Helper.getPagingOffset(page, 200);
        const res = await dozuki.pullUsers(pagingOffset);
        if (!res.status || !res.data || !res.data.length) {
            Logger.info(`User fetchAll ended with message: ${res.msg || 'No data'}`, new Date());
            page = -1;
            continue;
        }
        dozukiService.save(res.data, {});
        page++;
    }
}

export const dailyFetch = async () => {
    const dozukiService = new UserService(new UserRepository());
    let page = 1;
    const unixTime = DateHelper.toEarlyUnixTime(new Date());
    const dozuki = new DAPIHandler();
    const criteria = {
        order: 'DESC'
    };
    while (page > 0) {
        const pagingOffset = Helper.getPagingOffset(page, 200);
        const res = await dozuki.pullUsers({ ...pagingOffset, ...criteria });
        if (!res.status || !res.data || !res.data.length) {
            Logger.info(`User dailyFetch ended with message: ${res.msg || 'No data'}`, new Date());
            page = -1;
            continue;
        }

        for (const user of res.data) {
            if (user.join_date < unixTime) {
                Logger.info(`User dailyFetch ended`, new Date());
                page = -10;
                break;
            }
            dozukiService.findAndUpdate({ userid: user.userid }, user, { upsert: true });
        }

        page++;
    }
}

const UserTasks = {
    fetchAll, dailyFetch
};
export default UserTasks;