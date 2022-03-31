/**
 * @owner BlueSky
 * @description Define a session for APP
 * @since 1.0.0
 * @date May 14, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import crypto from 'crypto';
import dotenv from 'dotenv';
import RedisHandler from './redis.lib';
import JWTHandler from './json-web-token.lib';
import { Logger } from '../../utils/logger.util';
import { MSG } from '../../utils/message.util';

dotenv.config();
const SESSION_KEY = process.env.APP_SESSION_KEY || 'APP.SESSION';
const SESSION_TIMEOUT = process.env.APP_SESSION_TIMEOUT || 60; // Minute

export default class Session {
    private db: RedisHandler;
    constructor() {
        this.db = new RedisHandler(process.env.REDIS_HOST || 'localhost', Number(process.env.REDIS_PORT || 6379));
    }

    async set(info: IUser, device: string = '') {
        const token = crypto.randomBytes(64).toString('base64');

        const _info: ISession = {
            token: '',
            salt: crypto.randomBytes(16).toString('hex'),
            device
        };

        info.createdAt = new Date().toISOString();
        info.exp = this.setExpired(Number(SESSION_TIMEOUT));

        const jwt = new JWTHandler(_info.salt);
        _info.token = jwt.define(info);

        this.db.setJson(SESSION_KEY, token, _info);
        return token;
    }

    async update(token: string) {
        const curSession = await this.get(token);
        if (!curSession) {
            return false;
        }
        const jwt = new JWTHandler(curSession.salt);
        const user: IUser = jwt.decode(curSession.token)?.payload;
        user.createdAt = new Date().toISOString();
        user.exp = this.setExpired(Number(SESSION_TIMEOUT));

        curSession.token = jwt.define(user);
        this.db.setJson(SESSION_KEY, token, curSession);

        return true;
    }

    async validate(token: string) {
        const curSession = await this.get(token);
        if (!curSession) {
            throw new Error(MSG.ERROR_CODE['403']);
        }
        const jwt = new JWTHandler(curSession.salt);
        const result: any = jwt.verify(curSession.token);
        if (result.message) {
            this.destroy(token);
            return false;
        }

        return this.update(token);
    }

    destroy(token: string) {
        return this.db.deleteJson(SESSION_KEY, token);
    }

    get(token: string = ''): Promise<ISession> {
        return this.db.getJson(SESSION_KEY, token);
    }

    private setExpired(minuteNo: number): number {
        const date = new Date();
        date.setMinutes(date.getMinutes() + minuteNo);
        return Math.floor(date.getTime() / 1000);
    }

    async getCurrents(token: string = ''): Promise<IUser[]> {
        const appSession = await this.get(token);
        if (!appSession) return null;

        if (token) {
            return [this.parse(JSON.stringify(appSession))]
        }

        const users: IUser[] = [];
        for (const token in appSession) {
            const _user = this.parse(appSession[token]);
            _user.token = token;
            users.push(_user);
        }
        return users;
    }

    private parse(jsonSession: string): IUser {
        let info: ISession = null;
        try {
            info = JSON.parse(jsonSession);
        } catch (error) {
            Logger.error(error);
        }
        if (!info) {
            return null;
        }
        const jwt = new JWTHandler(info.salt);
        return jwt.decode(info.token)?.payload;
    }
}
