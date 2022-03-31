/**
 * @owner BlueSky
 * @description Define connections for MongoDB
 * @since 1.0.0
 * @date Mar 22, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import mongoose, { Connection } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const DOZUKI_CONNECTION: string
    = `mongodb://${process.env.MGDB_DOZUKI_USERNAME}:${encodeURIComponent(process.env.MGDB_DOZUKI_PASSWORD)}@${process.env.MGDB_DOZUKI_HOST}:${process.env.MGDB_DOZUKI_PORT}/${process.env.MGDB_DOZUKI_DATABASE}`;

export const CBOT_CONNECTION: string
    = `mongodb://${process.env.MGDB_CBOT_USERNAME}:${encodeURIComponent(process.env.MGDB_CBOT_PASSWORD)}@${process.env.MGDB_CBOT_HOST}:${process.env.MGDB_CBOT_PORT}/${process.env.MGDB_CBOT_DATABASE}`;

export const CAUTHEN_CONNECTION: string
    = `mongodb://${process.env.MGDB_CAUTHEN_USERNAME}:${encodeURIComponent(process.env.MGDB_CAUTHEN_PASSWORD)}@${process.env.MGDB_CAUTHEN_HOST}:${process.env.MGDB_CAUTHEN_PORT}/${process.env.MGDB_CAUTHEN_DATABASE}`;

export const OPTION_CONNECTION = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    authSource: process.env.MGDB_CLABEL_DATABASE_DEFAULT || 'admin'
};
export function initDBConnection(): void {
    mongoose.connect(CBOT_CONNECTION, OPTION_CONNECTION, (err) => {

    });
};

export function createDBConnection(connectionString, option = {}): Connection {
    return mongoose.createConnection(connectionString, { ...OPTION_CONNECTION, ...option });
};