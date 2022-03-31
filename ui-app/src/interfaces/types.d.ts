/**
 * @owner BlueSky
 * @description Define global objects - Not need to import for using
 * @since 1.0.0
 * @date May 01, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

interface IResponse {
    msg?: string;
    status?: boolean;
    data?: any,
    [key: string]: any
}
interface IGetListResp<rowData> extends IResponse {
    data: rowData[];
    totalCount?: number;
    loading: boolean;
}

interface IGetOneResp<rowData> extends IResponse {
    data: rowData;
    loading?: boolean;
}

interface IState {
    nav: { [x: string]: any, data: INavItem[] };
    country: IGetListResp<ICountry>;
    dashboard: {
        retrieveWorklogs: IGetListResp<any>;
        syncParamsWorklogs: ISearchParams;
    }
    partner: {
        getCombobox: IGetListResp<IItemMaster>;
    };
    apiToken: {
        getOne: IGetOneResp<IAPIToken>;
        getList: IGetListResp<IAPIToken>;
    },

}

interface IAction {
    type: string;
    payload: any;
}

interface ILocationStateStype {
    from: { pathname: string }
}
interface INavItem {
    id: ID_MENU;
    name: string;
    path?: string;
    icon?: React.ComponentElement;
    children?: INavItem[];
    active?: boolean;
    parentId?: string;
    users?: string[];
    component?: JSX.Element;
    [x: string]: any;
}
interface IUser {
    id: string;
    name: string;
    accountName: string;
    email: string;
    role: string;
    token: string;
    providerToken?: string;
}

interface IGetListParams extends ISearchParams {
    [props: string | number]: any;
}

interface IFindOneParams {
    _id: string;
}

interface ISearchParams {
    searchFields?: {
        [prop: string]: any;
    };
    searchText?: string;
    options?: {
        [prop: string]: any;
        limit?: number;
        page?: number;
        sort?: {
            [prop: string]: any;
        };
        fields?: object,
    };
    [key: string]: any
}

interface ICRUDParameter<T = null> {
    _id?: string;
    data?: T | null;
    [key: string]: any;
}

interface IContextProps {
    searchParams: ISearchParams;
    workspace?: {
        macAddress?: any;
        serialNumber?: any;
        unitPassword?: any;
        [x: string]: any
    };
}

type IActionTypes = 'create' | 'edit' | 'view';
