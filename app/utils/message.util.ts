
/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date July 27, 2020
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 */

import { StringHelper } from "./helper.util"

export const MSG = {
    NOT_FOUND: {
        INSERT: 'Data not inserted',
        CREATE: 'Data not created',
        UPDATE: 'Data not updated',
        DELETE: 'Data not deleted',
        FIND: 'Data not found'
    },
    SUCCESS: {
        INSERT: '[%s] inserted successfully',
        CREATE: '[%s] created successfully',
        UPDATE: '[%s] updated successfully',
        DELETE: '[%s] deleted successfully'
    },
    FAILURE: {
        INSERT: '[%s] inserted unsuccessfully',
        CREATE: '[%s] created unsuccessfully',
        UPDATE: '[%s] updated unsuccessfully',
        DELETE: '[%s] deleted unsuccessfully',
    },
    ERROR_CODE: {
        '11000': '[%s] duplicated',
        '403': 'Authentication error. Token is invalid or expired.',
        '404': 'Authentication error. Token required.'
    }
}

export const MsgManager = {
    inserted: (status: boolean, ...args: Array<string>) => {
        return StringHelper.sprintf(status ? MSG.SUCCESS.INSERT : MSG.FAILURE.INSERT, ...args);
    },
    created: (status: boolean, ...args: Array<string>) => {
        return StringHelper.sprintf(status ? MSG.SUCCESS.CREATE : MSG.FAILURE.CREATE, ...args);
    },
    updated: (status: boolean, ...args: Array<string>) => {
        return StringHelper.sprintf(status ? MSG.SUCCESS.UPDATE : MSG.FAILURE.UPDATE, ...args);
    },
    deleted: (status: boolean, ...args: Array<string>) => {
        return StringHelper.sprintf(status ? MSG.SUCCESS.DELETE : MSG.FAILURE.DELETE, ...args);
    },
    message: (format: string, ...args: Array<string>) => {
        if (args && args.length) {
            return StringHelper.sprintf(format, ...args);
        }
        return format;
    },
    error: (code: string, ...args: Array<string>) => {
        return StringHelper.sprintf(MSG.ERROR_CODE[code], ...args);
    }
};