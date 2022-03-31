/**
 * @owner BlueSky
 * @description The socket-io client for the authentication
 * @since 2.1.1
 * @date Mar 29, 2022
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import SocketIOClient from "./clientio.socket";
import { remove } from '../services/session.service';

export const onAuthenticate = () => {
    const cauthURL = process.env.REACT_APP_CAUTHEN_URL;
    const clientio = new SocketIOClient(cauthURL + '/socket/auth', { reconnection: true });

    clientio.onConnect(() => {
        clientio.onListen("auth_logout_client", () => {
            remove();
            window.location.assign("/");
        });
    });

    clientio.onDisconnect(() => {
        clientio.close();
        remove();
        window.location.reload();
    });

    clientio.onError(() => {
        clientio.close();
        remove();
        window.location.reload();
    });

    return clientio;
}
