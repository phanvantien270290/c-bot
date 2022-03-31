/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date June 16, 2020
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 */

import * as React from 'react';
// import MaterialTable, { Icons, MaterialTableProps, Action, Options, MTableToolbar, MTableCell } from 'material-table';
import {
    DataGrid,
    DataGridProps,
    GridActionsCellItem,
    GridActionsCellItemProps,
    GridRowParams,
} from '@mui/x-data-grid';
import EditOutlined from '@mui/icons-material/EditOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';


export interface IGridActionsCellItemProps {
    (params: GridRowParams): Partial<GridActionsCellItemProps>[];
}
export interface IDataGridProps extends DataGridProps {
    actions?: IGridActionsCellItemProps

}



const renderActions = (params: GridRowParams, actions: IGridActionsCellItemProps): any => {
    return actions(params).map((action, index) => {
        const label = action.label?.toLocaleLowerCase();

        if (label === 'delete') {
            action.icon = <DeleteOutlinedIcon />
        }
        if (label === 'update') {
            action.icon = <EditOutlined />
        }
        if (label === 'view') {
            action.icon = <VisibilityOutlinedIcon />
        }
        return <GridActionsCellItem
            {...action as any}
        />
    })

}
const TableListComponent: React.FC<IDataGridProps> = ({ columns, actions, ...props }) => {


    // const _options: Options<any> = {
    //     headerStyle: {
    //         // color: theme.palette.secondary.main,
    //         fontWeight: "bolder"
    //     },
    //     ...options
    // }

    if (typeof actions === 'function') {
        columns.push({
            field: 'actions',
            type: 'actions',
            width: 80,
            getActions: (params) => renderActions(params, actions)
        })
    }

    // if (props.title) {
    //     let _mTableToolBar;
    //     _mTableToolBar = (props: any) => <MTableToolbar {...props} classes={{ title: classes.title }} />
    //     props.components = { ...props.components, Toolbar: _mTableToolBar }
    // }

    //overwrite padding tableCell
    // let _mTableCell = (props: any) => <MTableCell className={clsx(classes.tbCell, classes.muiIconButtonRoot)} {...props} />
    // props.components = { ...props.components, Cell: _mTableCell, Pagination: PatchedPagination };
    return (
        <DataGrid columns={columns}{...props} />
        // <MaterialTable icons={tableIcons} actions={actions} options={_options} {...props} />
    );
}
export default TableListComponent