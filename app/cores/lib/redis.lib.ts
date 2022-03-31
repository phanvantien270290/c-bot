/**
 * @owner BlueSky
 * @description Define Redis library for APP
 * @since 1.0.0
 * @date May 14, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { createClient, RedisClient } from 'redis';

export default class RedisHandler {
    private client: RedisClient;
    constructor(private host: string, private port: number) {
        this.client = createClient(this.port, this.host);
    }

    setText(name: string, value: string): Promise<any> {
        return new Promise(resolve => {
            this.client.set(name, value, (err) => resolve(err || true));
        });
    }

    getText(name: string): Promise<any> {
        return new Promise(resolve => {
            this.client.get(name, (err, reply) => resolve(err || reply));
        });
    }

    setJson(name: string, field: string, json: any): Promise<any> {
        return new Promise(resolve => {
            const jsonStr = JSON.stringify(json);
            this.client.hmset(name, field, jsonStr, (err) => resolve(err || true));
        });
    }

    getJson(name: string, field: string = ''): Promise<any> {
        return new Promise(resolve => {
            if (field) {
                this.client.hget(name, field, (err, reply) => resolve(err || JSON.parse(reply)));
            }
            this.client.hgetall(name, (err, json) => resolve(err || json));
        });
    }

    deleteJson(name: string, field: string): Promise<any> {
        return new Promise(resolve => {
            this.client.hdel(name, field, (err, num) => resolve(err || num));
        });
    }

    remove(name: string): Promise<any> {
        return new Promise(resolve => {
            this.client.del(name, (err, num) => resolve(err || num));
        });
    }

    flush() {
        return this.client.flushdb();
    }
}