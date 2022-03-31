/**
 * @owner BlueSky
 * @description The App entry
 * @since 1.0.0
 * @date Mar 22, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import winston from 'winston';
import dotenv from 'dotenv';
import fs from "fs";
import bodyParser from 'body-parser';
import { Logger } from './utils/logger.util';
import { registerRouter } from './routes/index.router';
dotenv.config();

const isProd = process.env.NODE_ENV.trim().toLowerCase() === 'production';
const rootPath = isProd ? '../../' : '../';

const accessLogStream = fs.createWriteStream(path.join(__dirname, rootPath, 'logs/access.log'), { flags: 'a' });
const app = express();

// MongoDB connection
import { initDBConnection } from './config/mongo-connection.config';
import { onAuthenticationConnect } from './sockets/authentication.socket';
initDBConnection();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(morgan('combined', { stream: accessLogStream }));
app.use(compression());
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, rootPath, 'ui-app/build')));

registerRouter(app);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, rootPath, 'ui-app/build', 'index.html'));
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
    Logger.error(err.message, err);
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = isProd ? {} : err;

    // render the error page
    res.status(err.status || 500);
    res.json({ error: err });
});

winston.add(new winston.transports.File({
    filename: 'logs/exception.log',
    handleExceptions: true
}));

onAuthenticationConnect();

export default app;