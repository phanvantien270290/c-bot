import React from 'react';
import TableListComponent, { IDataGridProps } from '../../../../components/material-table/table-list.component';

interface IListView extends IDataGridProps {

}

const ListViewWrapper: React.FC<IListView> = ({ ...otherProps }: IListView) => {
    const _options: IDataGridProps = {
        ...otherProps,
        pagination: true,
        rowsPerPageOptions: [20, 40, 100],
        paginationMode: "server",
        autoHeight: false,
    }
    return <TableListComponent style={{ height: 300, overflowY: "auto" }} {..._options} />

}
export default ListViewWrapper