/**
 * @owner BlueSky
 * @description Handle socket connection
 * @since 1.0.0
 * @date Mar 24, 2022
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import SocketIO from "socket.io";
import WorklogTasks from "../tasks/worklog.task";
import WorklogService from "../services/worklog.service";
import WorklogRepository from "../repositories/worklog.repository";
import { DateHelper } from "../../../utils/helper.util";

export default class WorklogSocket {
    static connect(socket: SocketIO.Socket) {
        socket.on('refresh', (timestamp: { start: number, end: number }, type: string) => {
            this.refresh(timestamp.start, timestamp.end, type)
                .then(res => {
                    socket.emit('after_refreshing', res);
                });
        });
    }

    private static async refresh(start: number, end: number, type: string) {
        WorklogTasks.dailyFetch();
        const results = {
            points: [],
            rows: []
        }

        const service = new WorklogService(new WorklogRepository());
        const { data } = await service.getWorklogs({
            searchFields: {
                $or: [
                    { starttime: { $gte: start, $lte: end } },
                    { endtime: { $gte: start, $lte: end } }
                ]
            }
        });

        if (Array.isArray(data) && data.length) {
            results.rows = data;

            // Calculate points
            let dateFormat = 'yyyy-MM-dd';
            switch (type) {
                case 'HOUR':
                    dateFormat += ' HH';
                    break;
                case 'MINUTE':
                    dateFormat += ' HH:mm';
            }
            const points = {};
            for (const item of data) {
                const dateAt = item.endtime || item.starttime;
                const pointKey = DateHelper.formatFromUnixTime(dateAt, dateFormat);
                if (points[pointKey]) {
                    points[pointKey].value++;
                } else {
                    points[pointKey] = {
                        value: 1,
                        date: dateAt,
                        key: pointKey
                    }
                }
            }
            for (const prop in points) {
                results.points.push(points[prop]);
            }
        }

        return results;
    }
}