import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useSnackbar } from "notistack";
import { useForm } from 'react-hook-form';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import useStylesSearch from './search.style';
import { Grid, Typography, Paper, Tabs, Tab } from '@mui/material';
import TableListComponent from '../material-table/table-list.component';
import { DataGridProps, GridColDef } from '@mui/x-data-grid';
import FormSearchComponent, { IFormSearchAdvance, IFormSearchProps } from './form-search.component';

export interface ISearchFormConfig {
    placeHolder: string // Placeholder for  search field
    formSearchAdvance?: IFormSearchAdvance[],
    isTimeoutShouldBeCleared?: boolean
}
export interface ITableConfig {
    columns: GridColDef[],
    // actions?: Action<any>[],
    // options?: Options<any>,
    optionsSearch?: ISearchParams['options'],
    pageSizeOptions?: number[],
}
export interface ITabConfig {
    tabsLabel: string[],
    ariaLabel?: string,
    isEnabled: boolean,
    selectedTab: number,
    onChangeTab: (value: any) => void
}
export interface IListSearchDialogProps {
    open: boolean,
    onClose: (newItem?: any) => void,
    // onChangePage?: (page: number, pageSize: number) => void,
    // onSearch?: (params?: ISearchParams) => void,
    getListMethod(params?: ISearchParams): Promise<any>,
    title: string,
    searchConfig: ISearchFormConfig,
    tableConfig: ITableConfig,
    tabConfig?: ITabConfig,
    optionsHis?: IFormSearchProps['optionsHis']
}
const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const initListData = {
    data: [],
    totalCount: 0,
    loading: false,
}
const defaultPageSizeOptions = [10, 20, 50];
const ListSearchComponent: React.FC<IListSearchDialogProps> = (props) => {
    const { open,
        onClose,
        // onChangePage,
        // onSearch,
        getListMethod,
        tableConfig,
        optionsHis,
        searchConfig,
        title,
        tabConfig
    } = props;
    const {
        optionsSearch,
        pageSizeOptions = defaultPageSizeOptions,
    } = tableConfig;
    const { enqueueSnackbar } = useSnackbar();

    const initSearchParams = (): ISearchParams => {
        return {
            options: { sort: optionsSearch?.sort, page: 0, limit: pageSizeOptions[0] },
            searchFields: {},
            searchText: '',
        }
    }

    // const [optionSearch, setOptionSearch] = useState<ISearchParams['options']>({ sort: optionsSearch?.sort, page: 0, limit: pageSizeOptions[0] });
    const [listData, setListData] = useState(initListData);
    const classes = useStylesSearch();
    const useFormState = useForm({ defaultValues: initSearchParams() });
    const { register, getValues, setValue } = useFormState;
    const handleClose = () => {
        onClose(!open);
    };

    const handleonChangePage = (page: number) => {
        const _opsSearch = {
            ...getValues('options'),
            page,
            // limit: pageSize
        }
        setValue('options', _opsSearch);
        handleGetListMethod({ ...getValues(), options: _opsSearch }, false);
    }
    const handleGetListMethod = (params: ISearchParams = {}, resetPage: boolean = true) => {
        let hasData = false;
        let _params = params;
        if (resetPage) {
            const newOptions = { page: 0, ...params.options }
            setValue('options', newOptions);
            _params = { ..._params, options: newOptions }
        }
        setListData({ ...initListData, loading: true });
        getListMethod(_params).then((resp: any) => {
            if (!resp.status) { return enqueueSnackbar(resp.msg, { variant: "error" }) }
            hasData = true;
            setListData({ data: resp.data, totalCount: resp.total, loading: false })
        }).finally(() => {
            if (!hasData) {
                setListData({ ...initListData, loading: false });
            }
        })
    }
    const getListFormSearchAdvanceName = () => {
        let listFormSearchAdvance = searchConfig.formSearchAdvance;
        let listFormSearchName: string[] = [];
        listFormSearchAdvance?.forEach(formSearchAdvanceItem => {
            if (formSearchAdvanceItem.type === 'date' && formSearchAdvanceItem.hasDateRange) {
                listFormSearchName.push(`searchFields[${formSearchAdvanceItem.name}From]`, `searchFields[${formSearchAdvanceItem.name}To]`);
            } else {
                listFormSearchName.push(`searchFields[${formSearchAdvanceItem.name}]`);
            }
        });
        return listFormSearchName;
    }
    const setFormSearchAdvanceDefaultValue = (listFormSearchAdvance: string[]) => {
        listFormSearchAdvance.forEach(formSearchName => {
            setValue(`${formSearchName}`, null);
        });
    }
    const columns: GridColDef[] = [
        {
            headerName: '',
            field: 'index',
            // renderCell:({row,id})=>{

            // }
            // render: ({ tableData, ...row }) => {
            //     return (
            //         <div>
            //             {(tableData.id + 1) + ((getValues().options?.limit ?? 0) * (getValues().options?.page ?? 0))}.
            //         </div >
            //     )
            // }
        },
        ...tableConfig.columns
    ];

    // const options: Options<any> = {
    //     maxBodyHeight: searchConfig.formSearchAdvance && searchConfig.formSearchAdvance.length ? "calc(100vh - 295px)" : "calc(100vh - 222px)",//194  295
    //     minBodyHeight: 300,
    //     sorting: false,
    //     search: false,
    //     draggable: false,
    //     actionsColumnIndex: -1,
    //     paging: true,
    //     toolbar: false,
    //     emptyRowsWhenPaging: false,
    //     showTitle: false,
    //     pageSize: pageSizeOptions[0],
    //     pageSizeOptions: pageSizeOptions,
    //     ...tableConfig.options,
    // }
    useEffect(() => {
        if (open) {
            register('options');
            if (!tabConfig || !tabConfig.isEnabled) {
                handleGetListMethod(getValues());
            } else {
                handleGetListMethod(initSearchParams());
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    useEffect(() => {
        if (open) {
            setValue('searchText', '');
            setFormSearchAdvanceDefaultValue(getListFormSearchAdvanceName());
            handleGetListMethod(initSearchParams());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tabConfig?.selectedTab]);

    return (
        <Dialog disableEscapeKeyDown fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {title}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Grid style={{ margin: 10, zIndex: 12 }} >
                <FormSearchComponent onSearch={handleGetListMethod}
                    useForm={useFormState}
                    optionsHis={optionsHis}
                    {...searchConfig} />
            </Grid>
            <Grid item xs={12}>
                {!tabConfig?.isEnabled ? null :
                    (
                        <Paper>
                            <Tabs
                                value={tabConfig.selectedTab}
                                indicatorColor="secondary"
                                textColor="secondary"
                                aria-label={tabConfig.ariaLabel || 'Tabs container'}
                                onChange={(e, value: any) => tabConfig.onChangeTab(value)}
                            >
                                {tabConfig.tabsLabel.map((tabLabel, index) => {
                                    return <Tab disabled={listData.loading} key={index} label={tabLabel} />
                                })}
                            </Tabs>
                        </Paper>
                    )
                }
                < TableListComponent
                    onPageChange={handleonChangePage}
                    rowCount={listData.totalCount}
                    page={getValues('options')?.page || 0}
                    // {...tableConfig}
                    // options={options}
                    columns={columns}
                    rows={listData.data}

                />
            </Grid>
        </Dialog>
    );
}

export default ListSearchComponent