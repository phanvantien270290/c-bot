/**
 * @owner BlueSky
 * @description Root entry of the app
 * @since 1.0.0
 * @date Mar 22, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
/**
 * Module dependencies.
 */

import app from './app';
import debug from 'debug';
import http from 'http';
import dotenv from 'dotenv';
import { Logger } from './utils/logger.util';
import SocketIOServer from './cores/lib/socket-io.lib';
import WorklogSocket from './modules/dozuki/sockets/worklog.socket';
debug('cbot:server');
/**
 * Get port from environment and store in Express.
 */
dotenv.config();
const port = normalizePort(process.env.APP_PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            Logger.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            Logger.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            Logger.error(JSON.stringify(error));
            process.exit(1);
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log('Listening on ' + bind);
}

/**
 * Socket connection
 */
const io = new SocketIOServer(server);
io.getNsp('/dozuki_dashboard_worklog').on('connection', socket => {
    WorklogSocket.connect(socket);
});