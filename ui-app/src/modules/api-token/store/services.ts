/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date Mar 09, 2021
 * @contributors
 *      Phat Le <phat.le@ccintegration.com>
 */
 import { getApi, postApi, putApi } from '../../../services/api';
 import { IAPIToken } from '../../../interfaces/api-token.interface';

 export const APITokenRouter = {
    find: '/api/token/find',
    retrieve: '/api/token/retrieve',
    create: '/api/token/save',
    update: '/api/token/update'
}

const createAPIToken = (params: ICRUDParameter<IAPIToken>) => {
    return postApi(APITokenRouter.create, params)
}

const findOneAPIToken = (params: ICRUDParameter<IAPIToken>): Promise<any> => {
    return getApi(APITokenRouter.retrieve, params);
}

const updateAPIToken = (params: ICRUDParameter<IAPIToken>) => {
    return putApi(APITokenRouter.update, params);
}

const getListApiToken = (params: ISearchParams): Promise<any> => {
    return getApi(APITokenRouter.find, params);
}
export {
    createAPIToken,
    findOneAPIToken,
    updateAPIToken,
    getListApiToken
}
