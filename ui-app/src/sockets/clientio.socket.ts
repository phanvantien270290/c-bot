/**
 * @owner BlueSky
 * @description Define a socket-io client for APP - Listen to connections from the server
 * @since 2.1.1
 * @date Mar 29, 2022
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import io from 'socket.io-client';

export default class SocketIOClient {
    io: SocketIOClient.Socket;
    constructor(uri: string, opt: SocketIOClient.ConnectOpts = {}) {
        this.io = io(uri, opt);
    }

    onConnect(listener: VoidFunction) {
        return this.io.on('connect', listener);
    }

    onDisconnect(listener: VoidFunction) {
        this.io.on('disconnect', (reason: any) => {
            console.error(`Client socket disconnected: ${reason}`);
            listener();
        });
    }

    onError(listener: VoidFunction) {
        this.io.on('connect_error', (error: Error) => {
            console.error(`Client socket error: ${error?.message}`, error);
            listener();
        });
    }

    onListen(eventName: string, listener: any) {
        return this.io.on(eventName, listener);
    }

    dispatch(eventName: string, ...args: any) {
        return this.io.emit(eventName, args);
    }

    close() {
        this.io.disconnect();
        this.io.close();
    }
}