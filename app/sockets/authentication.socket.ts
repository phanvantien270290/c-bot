/**
 * @owner BlueSky
 * @description Define a client socket for connecting to the C-Authentication
 * @since 2.1.1
 * @date Mar 19, 2021
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

import Session from '../cores/lib/session.lib';
import SocketIOClient from '../cores/lib/socket-io-client.lib';

export function onAuthenticationConnect() {
    const client = new SocketIOClient(`${process.env.PROVIDER_HOST}/socket/auth`);
    client.onConnect(() => {
        client.onListen('auth_logout_client', async (data: any) => {
            const _session = new Session();
            const _users: IUser[] = await _session.getCurrents();
            if (!_users || !data) {
                return;
            }
            for (const _user of _users) {
                if (!_user.providerToken || _user.providerToken !== data.token) {
                    continue;
                }
                _session.destroy(_user.token);
                break;
            }
        });
    });
    client.onDisconnect(() => { });

    client.onError(() => { });
}