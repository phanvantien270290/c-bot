/**
 * @owner BlueSky
 * @description The socket-io client for the Worklog Dashboard
 * @since 2.1.1
 * @date Mar 29, 2022
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import SocketIOClient from "./clientio.socket";

export const onWorklogRefresh = () => {
    const _URL = process.env.REACT_APP_CBOT_URL;
    const clientio = new SocketIOClient(_URL + '/dozuki_dashboard_worklog', { reconnection: true });

    clientio.onConnect(() => {

    });

    clientio.onDisconnect(() => {
        clientio.close();
    });

    clientio.onError(() => {
        clientio.close();
    });

    return clientio;
}
