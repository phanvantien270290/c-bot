/**
 * @owner BlueSky
 * @description Define a Logger function
 * @since 1.0.0
 * @date Mar 22, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import winston from "winston";
import { LOG_LEVEL } from './enum.util';

export const Logger = winston.createLogger({
    level: LOG_LEVEL.INFO,
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.prettyPrint()
    ),
    transports: [
        // new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/cbot.log' }),
        //   new winston.transports.Couchdb({ 'host': 'localhost', 'db': 'logs' }),
        //   new winston.transports.Riak({ bucket: 'logs' }),
        //   new winston.transports.MongoDB({ db: 'db', level: 'info'})
    ],
    // exceptionHandlers: [
    //     new winston.transports.File({ filename: 'logs/exceptions.log' })
    // ]
});