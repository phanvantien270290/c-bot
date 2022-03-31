import { format as _formatDate, } from 'date-fns';
import _ from 'lodash';
import { regexReplace } from './regexType';
import { CUSTOMER } from './enum.util';
interface requestTypeProps {
    REQUEST: string;
    SUCCESS: string;
    FAILURE: string;
    RESET: string;
    PAGINATION: string;
}
function createRequestTypes(base: string): requestTypeProps {
    return ['REQUEST', 'SUCCESS', 'FAILURE', 'RESET', 'PAGINATION'].reduce((acc: any, type: string) => {
        acc[type] = `${base}_${type}`;
        return acc;
    }, {})
}
const encode = (val: any) => {
    return encodeURIComponent(val)
        .replace(/%3A/gi, ':')
        .replace(/%24/g, '$')
        .replace(/%2C/gi, ',')
        .replace(/%20/g, '+')
        .replace(/%5B/gi, '[')
        .replace(/%5D/gi, ']');
}
const createQueryString = (params: any): string => {
    let parts: any = [];

    _.forEach(params, function serialize(val: any, key: any) {
        if (val === null || typeof val === 'undefined') {
            return;
        }
        if (_.isArray(val)) {
            key = key + '[]';
        } else {
            val = [val];
        }

        _.forEach(val, function parseValue(v: any) {
            if (_.isDate(v)) {
                v = v.toISOString();
            } else if (_.isObject(v)) {
                v = JSON.stringify(v);
            }
            parts.push(encode(key) + '=' + encode(v));
        });
    });
    return parts.join('&');
}
const formatPadStart = (value: number | string, padStart: number = 0, fillString: string) => {
    return value.toString().padStart(padStart, fillString);
}
const formatPadStartWithMinMax = (min: number = 0, max: number = 0, padStart: number = 0) => {
    let _min = min.toString().padStart(padStart, "0");
    let _max = max.toString().padStart(padStart, "0");
    return `${_min} / ${_max}`;
}
const isValidDate = function (d: any) {
    //Object.prototype.toString.call(d) === "[object Date]"
    return d instanceof Date && !isNaN(d as any);
}

const formatDate = (date: Date | number, formatString: string = "MM/dd/yyyy") => {
    if (!date) { return ''; }
    return _formatDate(date, formatString);

}
const convertParamsToRequest = (params: ISearchParams = {}) => {
    if (typeof params !== 'object') { return params; }

    const { searchFields, searchText, options, ...others } = params;
    const searchParams: ISearchParams = { ...others };
    const _searchFields: any = {};

    if (searchFields) {
        for (const [key, value] of Object.entries(searchFields)) {
            if (!value) { continue; }
            const date = Object.prototype.toString.call(value);
            if (date === "[object Date]" && !isValidDate(value)) {
                continue;
            }
            _searchFields[key] = value;
        }
        if (Object.keys(_searchFields).length > 0) {
            searchParams.searchFields = _searchFields;
        }
    }
    if (searchText) {
        searchParams.searchText = searchText;
    }
    if (options) {
        if (!options.sort || !Object.keys(options.sort).length) {
            delete options.sort;
        }
        searchParams.options = options;
    }
    return searchParams;
}
const redirectToLogin = () => {
    const redirectParam = createQueryString({ redirect: process.env.REACT_APP_CLABEL_URL });
    window.location.assign(`${process.env.REACT_APP_CAUTHEN_URL}/#/login?${redirectParam}`);
}
const convertToMACAdress = (str: string) => {
    let _str = str.replace(regexReplace.specialChars, '').match(/.{1,2}/g);
    return (_str || []).join(":");
}
const sortListAscending = (list: any, key?: string) => {
    list.sort(function (a: any, b: any) {
        let keyA = typeof a === 'object' && key ? a[key] : a;
        let keyB = typeof b === 'object' && key ? b[key] : b;
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0
    });
    return list;
}
const isForceUppercase = (custId: string = '') => {
    return custId === CUSTOMER.FORTINET || custId === CUSTOMER.SILVERPEAK;
}
const createUUID = () => {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16); // eslint-disable-line
    });
    return uuid;
}
export {
    formatDate,
    createRequestTypes,
    formatPadStartWithMinMax,
    convertParamsToRequest,
    isValidDate,
    formatPadStart,
    createQueryString,
    sortListAscending,
    convertToMACAdress,
    isForceUppercase,
    createUUID,
    redirectToLogin
}

/* with method Object.prototype.toString.call(value) will be return
value = String => "[object String]"
value = Number => "[object Number]"
value = Object => "[object Object]"
value = Array  => "[object Array]"
value = RegExp => "[object RegExp]"
value = Date => "[object Date]"
value = Null => "[object Null]"
value = Undefined => "[object Undefined]"
*/