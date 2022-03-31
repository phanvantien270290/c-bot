/**
 * @owner BlueSky
 * @description Define global objects - Not need to import for using
 * @since 1.0.0
 * @date May 14, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

interface ISession {
    token: string;
    salt: string;
    device: string;
}

interface IUser {
    accountName: string;
    name: string;
    email: string;
    providerToken?: string;
    createdAt?: string;
    exp?: number;
    token?: string;
}

interface ISearchParams {
    searchFields?: IQuery;
    options?: {
        limit?: number,
        page?: number,
        sort?: {
            [prop: string]: any
        }
        fields?: object,
        [prop: string]: any
    };
    searchText?: string;
    token?: string;
    [key: string]: any;
}

interface ICRUDParameter<T = null> {
    _id?: string;
    data?: T;
    [key: string]: any;
}

interface IQuery {
    [key: string]: any
}

interface IData {
    [field: string]: any
}