/**
 * @owner BlueSky
 * @description Define helpful functions
 * @since 1.0.0
 * @date Mar 22, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { createCipheriv, createDecipheriv, createHash, randomBytes } from 'crypto';
import {
    getUnixTime, fromUnixTime, format, intervalToDuration, intlFormat, addDays, subDays, endOfDay, startOfDay
} from 'date-fns';
import _ from 'lodash';
import GoogleAPI from '../cores/lib/google-api.lib';
import { FREQUENCY } from './enum.util';

const DAYSOFYEAR = 365.2425;
const DAYSOFMONTH = 30.436875;

export function leftPad(str: string, len: number, pad: string = '0') {
    if (len + 1 >= str.length) {
        str = Array(len + 1 - str.length).join(pad) + str;
    }
    return str;
}

export function formatUriPath(uriPath: string) {
    if (!uriPath) return '';
    return uriPath.replace(/^[\/ | \W]*/g, '');
}

export function matchRegex(strMatch: string, reg: RegExp) {
    return reg.test(strMatch);
}

export async function retrieveGoogleSheet(spreadsheetid: string, sheetName: string, range: string = 'A1:Z', majorDimension = 'ROWS') {
    const googleApi = new GoogleAPI();
    const res: any = await googleApi.getSpreadsheet(spreadsheetid, sheetName, range, majorDimension);
    if (!res || !res.data || !res.data.values) {
        return null;
    }

    return res.data.values;
}

export const newRegex = (str: string, flags: string = 'gi') => {
    const _str = str.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(_str, flags);
}

export const StringHelper = {
    isString: function (str: string): boolean {
        return !(!str || typeof str !== "string" || !str.trim());
    },
    isWords: function (str: string): boolean {
        return this.isString(str) && !/[^\w\-\s]/g.test(str);
    },
    isMACAddress: (mac: string) => {
        return /^([0-9A-Fa-f]{2}[:]){5}([0-9A-Fa-f]{2})$/ig.test(mac);
    },
    trim: (str: string): string => {
        return typeof (str) === 'string' ? str.trim() : '';
    },
    /**
     * @description Use it for formating IP, MAC address, ....from a normal string like 6C2B59A15BF4 --> 6C:2B:59:A1:5B:F4
     * @param str The input string
     * @param numberOfChar The number of chars to determine a delimiter. Default: 2
     * @param delimiter Default: ':'
     * @return string 
     */
    formatStringFor: (str: string, numberOfChar: number = 2, delimiter: string = ':'): string => {
        let count = 0, newStr = '';
        const len = str.length;
        for (let i = 0; i < len; i++) {
            newStr += str[i];
            count++;
            if (count == numberOfChar && i < len - 1) {
                newStr += delimiter;
                count = 0;
            }
        }
        return newStr;
    },
    /**
     * Output a string formatted with parameters.
     * @param format It's %s I would like to %s
     * @param args ['the thing', 'show here']
     * @returns It's the thing I would like to show here
     */
    sprintf: (format: string, ...args: Array<string>) => {
        let index = 0, str = format;
        const len = args.length;
        while (index <= len - 1) {
            str = str.replace('%s', args[index]);
            index++;
        }
        return str;
    },
    capitalize: (str: string, onlyFirst: boolean = false) => {
        if (typeof str !== 'string') return '';
        return str.charAt(0).toUpperCase() + (onlyFirst ? str.slice(1).toLowerCase() : str.slice(1));
    },
    toArray: (str: string, separator: string | RegExp) => {
        if (typeof str !== 'string') return str;
        const arr = str.split(separator), res = [];
        for (const item of arr) {
            if (StringHelper.isString(item)) {
                res.push(StringHelper.trim(item));
            }
        }
        return res;
    },
    /**
 *  Accessing nested JavaScript objects and arrays by string path
 * @param o item
 * @param s string
 * @param type string | number
 * @returns  {key:string, value: string | number}
 */
    ObjectbyStringWithKeyValue: (o: object, s: string, type: string | number = "string") => {
        let a = s.split('.');
        const value = _.get(o, s, type === "string" ? '' : 0)
        return {
            key: a[a.length - 1],
            value: value
        }
    },
};

export const Helper = {
    encrypt: (plainText: string, secretKey: string, hashAlgorithm: string = 'sha1', algorithm: string = 'aes-128-cbc'): string => {
        const hash = createHash(hashAlgorithm).update(secretKey);
        const key = hash.digest().slice(0, 16);
        const iv = randomBytes(16);
        const cipher = createCipheriv(algorithm, key, iv);
        const encrypted = Buffer.concat([cipher.update(plainText), cipher.final()]);

        return iv.toString('hex') + '/' + encrypted.toString('hex');
    },
    decrypt: (cipher: string, secretKey: string, hashAlgorithm: string = 'sha1', algorithm: string = 'aes-128-cbc'): string => {
        const words = cipher.split('/');
        const hash = createHash(hashAlgorithm).update(secretKey);
        const key = hash.digest().slice(0, 16);
        const iv = Buffer.from(words.shift(), 'hex');

        const decipher = createDecipheriv(algorithm, key, iv);

        return Buffer.concat([decipher.update(Buffer.from(words.shift(), 'hex')), decipher.final()]).toString();
    },
    getPagingOffset: (page: number = 1, limit: number = 50): { offset: number, limit: number } => {
        if (isNaN(limit)) limit = 50;
        if (isNaN(page) || page < 1) page = 1;
        const offset = (page - 1) * limit;

        return { offset, limit };
    }
};

export const DateHelper = {
    secondsToTimeString: (seconds: number) => {
        const duration = DateHelper.secondsToTime(seconds);

        const years2Days = Math.floor(duration.years * DAYSOFYEAR);
        const months2Days = Math.floor(duration.months * DAYSOFMONTH);
        const dayStr = ((years2Days + months2Days + duration.days) + "").padStart(2, "0");
        const hourStr = (duration.hours + "").padStart(2, "0");
        const minutesStr = (duration.minutes + "").padStart(2, "0");
        const secondsStr = (duration.seconds + "").padStart(2, "0");

        return `${dayStr}:${hourStr}:${minutesStr}:${secondsStr}`;
    },
    secondsToTime: (seconds: number) => {
        const duration = intervalToDuration({ start: 0, end: seconds * 1000 });
        return duration;
    },
    toEarlyUnixTime: (dateAt: Date | number) => {
        return getUnixTime(startOfDay(dateAt));
    },
    toLateUnixTime: (dateAt: Date | number) => {
        return getUnixTime(endOfDay(dateAt));
    },
    convertTimezone: (date: Date | number, timeZone: string = null) => {
        return intlFormat(date, { timeZone });
    },
    fromUnixTime: (unixTime: number) => {
        return fromUnixTime(unixTime);
    },
    formatFromUnixTime: (unixTime: number, formatString: string = 'yyyy-MM-dd') => {
        return format(fromUnixTime(unixTime), formatString);
    },
    addDays: (dateAt: Date | number, amount: number) => {
        return addDays(dateAt, amount);
    },
    subDays: (dateAt: Date | number, amount: number) => {
        return subDays(dateAt, amount);
    },
    startOfDay: (dateAt: Date | number) => {
        return startOfDay(dateAt);
    },
    endOfDay: (dateAt: Date | number) => {
        return endOfDay(dateAt);
    },
    getUnixTimeRange: (frequency: FREQUENCY, date: number | Date) => {
        const _date = date || new Date();
        let eUnixTime: number = null;
        switch (frequency) {
            case FREQUENCY.WEEKLY:
                eUnixTime = DateHelper.toEarlyUnixTime(DateHelper.subDays(_date, 6)); // 6 is because it runs on every Fri (from prev Sat -> to curr Fri)
                break;
            default:
                eUnixTime = DateHelper.toEarlyUnixTime(_date);
        }
        return {
            eUnixTime,
            lUnixTime: DateHelper.toLateUnixTime(_date)
        }
    }
};