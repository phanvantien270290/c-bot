import React, { useEffect } from 'react'

import { connect, useDispatch, useSelector } from 'react-redux';
import { GridColDef, GridSortModel } from '@mui/x-data-grid';

import ListView from '../common/list-view.component'

import { RETRIEVE_WORKLOGS } from '../../store/actions';
import { IDataGridProps, StatusComponent } from '../../../../components';

import { retrieveWorklogs, syncParamsWorklogs } from '../../store/actions';
const sightOffsReduce = (user: string[], curUser: any, index: any, array: any) => {
    if (!user.includes(curUser.username)) {
        user.push(curUser.username);
    }
    return user
}


const WorklogListView: React.FC<any> = (props: any) => {

    const dispatch = useDispatch();
    const { data, loading, totalCount }: IGetListResp<any> = useSelector((state: IState) => state.dashboard.retrieveWorklogs);
    const syncParams = useSelector((state: IState) => state.dashboard.syncParamsWorklogs);
    const dispatchWithOptions = (subOptions: any) => {
        const { options, ...othersParams } = syncParams;
        const _newParams = { ...othersParams, options: { ...options, ...subOptions } };
        dispatch(syncParamsWorklogs(_newParams));
    }
    const onSortModelChange = (model: GridSortModel) => {
        let sort = {};
        if (model.length) {
            sort = { [model[0].field]: model[0].sort === 'desc' ? -1 : 1 }
        }
        dispatchWithOptions({ sort })
    }
    const onPageChange = (curPage: number) => {
        dispatchWithOptions({ page: curPage })

    }
    const onPageSizeChange = (pageSize: number) => {
        dispatchWithOptions({ limit: pageSize });
    }

    useEffect(() => {
        dispatch(retrieveWorklogs(syncParams, RETRIEVE_WORKLOGS.PAGINATION));
    }, [dispatch, syncParams])
    const columns: GridColDef[] = [
        {
            headerName: 'Guide Title',
            field: 'guide.title',
            minWidth: 200,
            flex: 1,
            valueGetter: ({ row: { guide = [] } }) => guide.length ? guide[0].title : ''
        }, {
            headerName: 'Work Order #',
            field: 'workorderid',
            width: 140,
        }, {
            headerName: 'C-Label OEM S/N',
            field: 'workorderid_refs',
            width: 140,
        }, {
            headerName: 'Difficutly',
            field: 'guide.difficulty',
            width: 100,
            valueGetter: ({ row: { guide = [] } }) => guide.length ? guide[0].difficulty : ''
        }, {
            headerName: 'User',
            field: 'user.username',
            minWidth: 170,
            valueGetter: ({ row: { user = [] } }) => user.length ? user[0].username : ''
        }, {
            headerName: 'Start Time',
            width: 150,
            field: 'starttime',
        }, {
            headerName: 'End Time',
            field: 'endtime',
            width: 140,
        }, {
            headerName: 'Duration',
            field: 'duration',
            width: 140,
        }, {
            headerName: 'Sign offs',
            field: 'signoffs.username',
            width: 150,
            valueGetter: ({ row: { signoffs = [] } }) => signoffs.length ? signoffs.reduce(sightOffsReduce, []).join(", ") : ''
        }, {
            headerName: 'Status',
            field: 'status',
            width: 140,
            renderCell: ({ row: { status } }) => <StatusComponent status={status} title={status} />
        }
    ];
    const _options: IDataGridProps = {
        rowCount: totalCount,
        columns,
        pageSize: syncParams.options?.limit,
        rows: data,
        loading,
        getRowId: (row: any) => row._id,
        onPageChange,
        onSortModelChange,
        onPageSizeChange,
        page: syncParams.options?.page,

    }
    return <ListView key={11}  {..._options} />
}

const PreloadWorklogListView = connect(null, {})(WorklogListView)
export default React.memo(PreloadWorklogListView)