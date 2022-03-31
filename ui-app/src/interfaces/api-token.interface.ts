import { GridSortModel } from "@mui/x-data-grid";

export interface IAPIToken {
    id: string;
    app: string;
    expiredAt?: Date | null;
    obsoleted?: boolean;
    [x: string]: any;
}

export interface IAPITokenDialogProps {
    isOpen: boolean;
    title: string;
    type?: string;
    data?: IAPIToken | null;
    onCloseDialog: () => void;
    onRefreshData?: (actionType: string, data: IAPIToken | null) => void;
}

export interface IAPITokenListProps {
    apiTokenList: { data: IAPIToken[], loading: boolean, totalCount: number };
    searchParams: ISearchParams;
    onActionClick: (type: string, data: IAPIToken) => void;
    onChangePage: (curPage: number) => void;
    onChangePageSize: (pageSize: number) => void;
    onSortModelChange: (sort: any) => void;
}

export interface IApiTokenSearchForm {
    searchParams: ISearchParams;
    inputNameRef: any;
    onChangeApiTokenName: (name: string) => void;
    onChangeApiTokenDate: (date?: Date | null) => void;
    onChangeApiTokenStatus: (status: string) => void;
    [key: string]: any;
}

export type IAPITokenNullable = IAPIToken | null;
