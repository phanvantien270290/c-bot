/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date Mar 02, 2021
 * @contributors
 *      Phat Le <phat.le@ccintegration.com>
 */

import React, { useRef, useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';

import { IAPITokenDialogProps } from '../../../interfaces/api-token.interface';
import APITokenListComponent from '../components/api-token-list.component';
import APITokenSearchFormComponent from '../components/api-token-search-form.component';
import APITokenDialogComponent from '../components/api-token-dialog.component';
import ActionMenuComponent, { MenuItemWithComboboxProps } from '../../../components/action-menu/action-menu.component';
import { getDialogTitle } from '../utils/api-token.util';
import { getListApiToken, getApiToken } from '../store/actions';
import { STATUS_DEVICE } from '../../../utils';

const searchOptionsInialize = {
    page: 0,
    limit: 10,
    sort: { 'createdAt': 'desc' }
}

const initSearchParams: ISearchParams = {
    searchFields: {
        app: '',
        obsoleted: STATUS_DEVICE.ACTIVE,
        expiredAt: null
    },
    options: searchOptionsInialize
}

const APITokenContainer = (props: any) => {
    const dialogPropsInitialize = {
        isOpen: false,
        title: '',
        type: 'view',
        data: null,
        onCloseDialog: () => { },
        onRefreshData: () => { }
    }
    const dispatch = useDispatch();
    const inputNameRef = useRef<any>(null);
    const [dialogProps, setDialogProps] = useState<IAPITokenDialogProps>(dialogPropsInitialize);
    const [actionType, setActionType] = useState('');

    const [searchParams, setSearchParams] = useState<ISearchParams>(initSearchParams);
    const changeApiTokenStatus = (status: string) => {
        setSearchParams({
            searchFields: {
                ...searchParams.searchFields,
                app: inputNameRef.current?.value,
                obsoleted: status
            },
            options: {
                ...searchParams.options,
                page: 0
            }
        });
    }
    const changeApiTokenName = (name: string = '') => {
        setSearchParams({
            searchFields: {
                ...searchParams.searchFields,
                app: name
            },
            options: {
                ...searchParams.options,
                page: 0
            }
        });
    }
    const changeApiTokenDate = (date: any) => {
        setSearchParams({
            searchFields: {
                ...searchParams.searchFields,
                app: inputNameRef.current?.value,
                expiredAt: date
            },
            options: {
                ...searchParams.options,
                page: 0
            }
        });
    }
    const handleOnSearch = () => {
        dispatch(getListApiToken({
            ...searchParams,
            searchFields: {
                ...searchParams.searchFields,
                app: inputNameRef.current?.value
            }
        }));
    };
    const handleActionClick = (type: string, data: any) => {
        if (type === 'refresh') {
            inputNameRef.current.value = '';
            setSearchParams({ ...initSearchParams });
        } else if (type === 'create') {
            setDialogProps({
                isOpen: true,
                title: getDialogTitle('create'),
                data: null,
                type: 'create',
                onCloseDialog: handleCloseDialog
            });
        } else if (type === 'update' || type === 'view') {
            setActionType(type);
            dispatch(getApiToken({
                searchFields: {
                    id: data.id
                }
            }));
        }
    }
    const handleCloseDialog = () => {
        setDialogProps({
            ...dialogProps,
            isOpen: false
        });
    }
    const handleChangePage = (curPage: number) => {
        setSearchParams({
            ...searchParams,
            options: {
                ...searchParams.options,
                page: curPage
            }
        })
    }
    const handleChangePageSize = (pageSize: number) => {
        setSearchParams({
            ...searchParams,
            options: {
                ...searchParams.options,
                limit: pageSize
            }
        })
    }
    const handleSortModelChange = (sort: any) => {
        setSearchParams({
            ...searchParams,
            options: {
                ...searchParams.options,
                sort
            }
        })
    }
    const leftAction: MenuItemWithComboboxProps<any>[] = [
        {
            title: 'add new', icon: 'add_circle_outled',
            disabled: props.apiTokenList.loading,
            onClick: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
                handleActionClick('create', null);
            }
        },
        {
            title: 'Search', icon: 'search',
            disabled: props.apiTokenList.loading,
            onClick: handleOnSearch
        }
    ]

    useEffect(() => {
        return () => {
            //dispatch(getListApiToken({reset: true}));
            dispatch(getApiToken({ reset: true }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (props.apiTokenDetail.data) {
            setDialogProps({
                isOpen: true,
                title: getDialogTitle(actionType),
                data: props.apiTokenDetail.data,
                type: actionType,
                onCloseDialog: handleCloseDialog
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.apiTokenDetail]);

    useEffect(() => {
        dispatch(getListApiToken(searchParams));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    return (
        < >
            <ActionMenuComponent leftAction={leftAction} />
            <APITokenSearchFormComponent
                searchParams={searchParams} inputNameRef={inputNameRef}
                onChangeApiTokenName={changeApiTokenName} onChangeApiTokenDate={changeApiTokenDate} onChangeApiTokenStatus={changeApiTokenStatus}
            />
            <APITokenListComponent
                apiTokenList={props.apiTokenList} searchParams={searchParams}
                onActionClick={handleActionClick} onChangePage={handleChangePage}
                onSortModelChange={handleSortModelChange}
                onChangePageSize={handleChangePageSize} />
            {dialogProps?.isOpen && <APITokenDialogComponent {...dialogProps} onRefreshData={handleActionClick} />}
        </>
    );
}

const mapStateToProps = (state: IState) => {
    return {
        apiTokenList: state.apiToken.getList,
        apiTokenDetail: state.apiToken.getOne
    };
};

export default connect(mapStateToProps, null, null, {})(APITokenContainer);

