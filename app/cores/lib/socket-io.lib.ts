/**
 * @owner BlueSky
 * @description Define a socket-io for APP
 * @since 2.1.1
 * @date Mar 19, 2021
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import SocketIO, { Server, ServerOptions } from "socket.io";
import { Server as httpServer } from 'http';

export default class SocketIOServer {
    private io: Server;
    constructor(server: httpServer, opt: ServerOptions = null) {
        this.io = new SocketIO(server, opt);
    }

    getNsp(namespace: string = '/') {
        return this.io.of(namespace);
    }

    onConnect(listener: VoidFunction, namespace: string = '/') {
        this.getNsp(namespace).on('connection', listener);
    }

    close() {
        this.io.close();
    }
}