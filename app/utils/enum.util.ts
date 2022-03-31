/**
 * @owner BlueSky
 * @description Define Enums
 * @since 1.0.0
 * @date Apr 02, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

export enum FORMAT_DATE {
    DMY = 'yyyy-MM-dd',
    HM = "HH:mm",
    HMS = 'HH:mm:ss',
    DMYH = 'yyyy-MM-dd HH',
    DMYHM = 'yyyy-MM-dd HH:mm',
    DMYHMS = 'yyyy-MM-dd HH:mm:ss'
}
export enum YESNO {
    NO = 'NO',
    YES = 'YES'
};
export enum DOWNLOAD_DIR {
    PATH = './files/downloads'
}
export enum LOG_LEVEL {
    ERROR = 'error',
    WARN = 'warn',
    INFO = 'info',
    HTTP = 'http',
    VERBOSE = 'verbose',
    DEBUG = 'debug',
    SILLY = 'silly'
}

export enum LMS_API_DATA_MODE {
    JSON = 'JSON',
    CSV = 'CSV'
}

export enum STATUS {
    ACTIVE = 'ACTIVE',
    DELETED = 'DELETED',
    INACTIVE = 'INACTIVE',
    NEW = 'NEW',
    OBSOLETED = 'OBSOLETED',
    OPEN = 'OPEN'
}

export enum CUSTOMER {
    ARISTA = 'ARISTA',
    CLOUDIAN = 'CLOUDIAN',
    FORTINET = 'FORTINET',
    PELCO = 'PELCO',
    CYLERA = 'CYLERA',
    VERASONICS = 'VERASONICS',
    PERCH = 'PERCH',
    SILVERPEAK = 'SILVERPEAK',
    STELLARCYBER = 'STELLARCYBER',
    QSC = 'QSC',
    ADVANTEST = 'ADVANTEST',
    APPNETA = 'APPNETA'
}

export enum HTTP {
    ERR_CONN_REFUSED = 'ECONNREFUSED',
    ERR_TIMED_OUT = 'ETIMEDOUT',
    ERR_NOT_FOUND = 'ENOTFOUND'
}


export enum WORKLOG {
    REPORT = 'REPORT',
    REPORT2ACU = 'REPORT2ACU',
}


export enum MODULE {
    DOZUKI_WORKLOG = 'DOZUKI_WORKLOG'
}

export enum FREQUENCY {
    HOURLY = "HOURLY",
    DAILY = "DAILY",
    WEEKLY = "WEEKLY",
    MONTHLY = "MONTHLY",
    YEARLY = "YEARLY"
}
