/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date Mar 02, 2021
 * @contributors
 *      Phat Le <phat.le@ccintegration.com>
 */

import React from 'react';
// import { Grid } from '@mui/material';
// import { Column } from 'material-table';

import {
    GridCallbackDetails,
    GridColumns,
    GridSortModel
} from '@mui/x-data-grid';
import TableListComponent, { IDataGridProps, IGridActionsCellItemProps } from '../../../components/material-table/table-list.component';
import StatusComponent from '../../../components/status.component';

// import { LIST_PAGE_SIZE_OPTIONS_SMALL as pageSizeOptions } from '../../../utils/constant';
import { formatDate } from '../../../utils/helper';
import { STATUS_DEVICE } from '../../../utils';
import { IAPITokenListProps } from '../../../interfaces/api-token.interface';

const APITokenListComponent = (props: IAPITokenListProps) => {
    const { apiTokenList, searchParams } = props;
    const onPageChange = (curPage: number, details: GridCallbackDetails) => {
        props.onChangePage && props.onChangePage(curPage);
    };
    const onPageSizeChange = (pageSize: number, details: GridCallbackDetails) => {
        props.onChangePageSize && props.onChangePageSize(pageSize);
    }
    const onSortModelChange = (model: GridSortModel) => {
        let sort = {};
        if (model.length) {
            sort = { [model[0].field]: model[0].sort === 'desc' ? -1 : 1 }
        }
        props.onSortModelChange && props.onSortModelChange(sort);
    }
    const handleActionClick = React.useCallback(
        (actionType: string, data: any) => () => {
            setTimeout(() => {
                props.onActionClick(actionType, data);
            });
        },
        [],
    );

    const columns: GridColumns = [
        // {
        //     headerName: '',
        //     field: 'index',
        //     width: 50,
        //     renderHeader: () => null,
        //     filterable: false,

        //     valueGetter: ({ tabIndex }) => tabIndex + ((searchParams.options?.limit ?? 0) * (searchParams.options?.page ?? 0))
        // },
        { headerName: 'ID', field: 'id', maxWidth: 100, flex: 1 },
        { headerName: 'Name', field: 'app', maxWidth: 150, flex: 1 },
        {
            headerName: 'Status',
            field: 'obsoleted',
            maxWidth: 150,
            flex: 1,
            renderCell: ({ row: { obsoleted } }) => <StatusComponent status={!obsoleted ? "COMPLETE" : "CANCELLED"}
                title={!obsoleted ? STATUS_DEVICE.ACTIVE : STATUS_DEVICE.INACTIVE} />
        }, {
            headerName: 'Expired Date',
            field: 'expiredAt',
            minWidth: 200,
            flex: 1,
            valueGetter: ({ row: { expiredAt } }: any) => expiredAt && formatDate(new Date(expiredAt), 'MM-dd-yyyy hh:mm:ss')
        },
    ];

    const actions: IGridActionsCellItemProps = ({ row }) => [
        {
            label: 'View',
            onClick: handleActionClick('view', row)
        }, {
            label: 'Update',
            onClick: handleActionClick('update', row)

        },
        // {
        //     label: 'Refresh',
        //     isFreeAction: true,
        //     onClick: handleActionClick('refresh', {})
        // }
    ];
    const options: IDataGridProps = {
        columns,
        rows: apiTokenList.data,
        onPageChange,
        onPageSizeChange,
        onSortModelChange,
        rowCount: apiTokenList.totalCount,
        page: searchParams.options?.page || 0,
        actions
        // sorting: false,
        // search: false,
        // draggable: false,
        // actionsColumnIndex: -1,
        // minBodyHeight: 300,
        // paging: true,
        // emptyRowsWhenPaging: false,
        // maxBodyHeight: apiTokenList.totalCount ? "calc(100vh - 400px)" : 'auto',
        // pageSize: pageSizeOptions[0],
        // pageSizeOptions: pageSizeOptions
    };
    return (
        <TableListComponent
            {...options}
        // title="API Token"

        />
    )
}

export default APITokenListComponent;