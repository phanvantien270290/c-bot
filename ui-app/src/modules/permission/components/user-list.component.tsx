import React, { createRef, useEffect } from 'react';
// import dotenv from 'dotenv';

// import PersonIcon from '@mui/icons-material/Person';
// import { TextField, Grid, Typography, InputAdornment, Switch } from '@mui/material';
// import { makeStyles, withStyles } from '@mui/styles';
// import { Theme } from '@mui/material/styles';
// import SearchIcon from '@mui/icons-material/Search';
// import SaveIcon from '@mui/icons-material/Save';
// import Button from '@mui/material/Button';

// import { getApi } from '../../../services/api';

// import { IUserInterface } from '../../../interfaces/user.interface';

// dotenv.config();

// const GreenSwitch = withStyles((theme: Theme) => ({
//     switchBase: {
//         color: '#fff',
//         '&$checked': {
//             color: '#fff',
//             '& + $track': {
//                 backgroundColor: '#52d869',
//                 opacity: 1
//             }
//         }
//     },
//     checked: {},
//     track: {
//         border: `1px solid ${theme.palette.grey[400]}`,
//         backgroundColor: theme.palette.grey[50],
//         opacity: 1
//     }
// }))(Switch);


// const gridStyles = makeStyles({
//     container: {
//         textAlign: 'left',
//         marginBottom: '20px'
//     },
//     root: {
//         paddingLeft: '10px'
//     },
//     paddingLeft16: {
//         paddingLeft: '16px'
//     }
// });

// const tableStyles = makeStyles({
//     h4: {
//         fontWeight: 700
//     }
// });

// const useStyles = makeStyles({
//     searchInputText: {
//         backgroundColor: '#f1f3f4'
//     },
//     searchInput: {
//         padding: '8.5px 8.5px'
//     }
// });

const UserListComponent = (props: any) => {
    // const customGridStyles = gridStyles();
    // const classesTable = tableStyles();
    // const classes = useStyles();

    const tableRef = createRef<any>();
    const inputSearchRef = createRef<any>();

    // const handleSaveUser = () => {
    //     props.saveUser(tableRef.current.state.data);
    // }

    // const handleOnKeyPress = (e: any) => {
    //     // user should enter to search user
    //     if (e.charCode === 13 && tableRef.current) {
    //         tableRef.current.onQueryChange({ usersNavigation: undefined, page: 0, search: e.target.value });
    //     }
    // }

    // const handleChangeSwitch = (isChecked: boolean, user: IUserInterface) => {
    //     let currentUserList: IUserInterface[] = tableRef.current.state.data;
    //     currentUserList.map(currentUser => {
    //         if (currentUser.loginname === user.loginname) {
    //             currentUser.checked = isChecked;
    //         }
    //         return currentUser;
    //     });
    //     tableRef.current.onQueryChange({ usersNavigation: currentUserList });
    // }

    // const isUserChecked = (loginname: string) => {
    //     let currentUserList = tableRef.current.state.data;
    //     let selectedUser = currentUserList.find((user: IUserInterface) => user.loginname === loginname);
    //     let isChecked = false;
    //     if (selectedUser.checked === undefined) {
    //         isChecked = props.navigationUsers.indexOf(loginname) !== -1;
    //     } else {
    //         isChecked = selectedUser.checked;
    //     }
    //     return isChecked;
    // }

    // const columns = [
    //     {
    //         title: '',
    //         field: 'index',
    //         width: 50,
    //         render: (rowData: any) => {
    //             let pageSize = tableRef.current.state.query.pageSize;
    //             let page = tableRef.current.state.query.page;
    //             let userIndex = (rowData.tableData.id + 1) + (pageSize * page);
    //             return (
    //                 <div>
    //                     {userIndex}
    //                 </div>
    //             )
    //         }
    //     },
    //     {
    //         title: 'Login Name',
    //         field: 'loginname'
    //     },
    //     {
    //         title: 'Full Name', field: 'name',
    //         render: (rowData: any) => (
    //             <span>
    //                 <PersonIcon style={{ verticalAlign: 'bottom' }} />
    //                 <span style={{ marginLeft: '10px' }}>{rowData.name}</span>
    //             </span>)
    //     },
    //     { title: 'Email', field: 'email' },
    //     {
    //         title: 'Action', field: 'actions', render: (rowData: IUserInterface) => {
    //             let isChecked = isUserChecked(rowData.loginname);
    //             return (
    //                 <GreenSwitch disabled={props.navId === ''} checked={isChecked} onChange={(e: any) => handleChangeSwitch(e.target.checked, rowData)} />
    //             )
    //         }
    //     }
    // ];

    // const options: any = {
    //     sorting: false,
    //     maxBodyHeight: "calc(100vh - 500px)",
    //     minBodyHeight: 500,
    //     search: false,
    //     searchFieldAlignment: 'left',
    //     draggable: false,
    //     emptyRowsWhenPaging: false,
    //     paging: true,
    //     pageSize: 10,
    //     pageSizeOptions: [10, 25, 50],
    //     headerStyle: { fontWeight: 700 },
    //     selection: false
    // }

    // const handleRemoteData = (query: any) => {
    //     return new Promise<any>((resolve: any) => {
    //         let searchParams: ISearchParams = {
    //             options: { page: query.page, limit: query.pageSize, fields: { '_id': 1, 'name': 1, 'email': 1, 'loginname': 1 } },
    //             searchFields: {
    //                 locked: { $ne: true }
    //             }
    //         };
    //         searchParams.searchText = query.search;
    //         let queryUsersNavigation = query.usersNavigation;
    //         if (queryUsersNavigation) {
    //             delete query.usersNavigation;
    //             resolve({
    //                 data: queryUsersNavigation,
    //                 page: query.page,
    //                 totalCount: query.totalCount
    //             });
    //         } else {
    //             getApi('/api/user/find', searchParams).then((res: any) => {
    //                 if (res.status) {
    //                     resolve({
    //                         data: res.data,
    //                         page: query.page,
    //                         totalCount: res.total
    //                     });
    //                 } else {
    //                     resolve({
    //                         data: [],
    //                         page: 0,
    //                         totalCount: 0
    //                     });
    //                 }
    //             });
    //         }
    //     })
    // }

    useEffect(() => {
        // reload user list
        if (tableRef.current) {
            inputSearchRef.current.value = tableRef.current.state.query.search;
            tableRef.current.onQueryChange({ page: 0, pageSize: 10 });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.navigationUsers]);

    return (
        <div>
            {/* <MaterialTable
                tableRef={tableRef}
                title={<Typography variant="h4" className={classesTable.h4}>Users</Typography>}
                columns={columns}
                data={query => handleRemoteData(query)}
                options={options}
                components={{
                    Toolbar: propsToolbar => (
                        <div>
                            <MTableToolbar {...propsToolbar} />
                            <Grid container spacing={1} className={customGridStyles.paddingLeft16}>
                                <Grid item md={2}>
                                    <Button disabled={props.navId === ''} onClick={handleSaveUser} fullWidth={true} variant="contained" startIcon={<SaveIcon />}>SAVE</Button>
                                </Grid>
                                <Grid item md={4}>
                                    <TextField
                                        className={classes.searchInputText}
                                        variant="outlined"
                                        size="small"
                                        placeholder="Search for Login Name, Name, Email"
                                        fullWidth={true}
                                        onKeyPress={handleOnKeyPress}
                                        inputRef={inputSearchRef}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SearchIcon />
                                                </InputAdornment>
                                            ),
                                            classes: { inputSizeSmall: classes.searchInput }
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                    )
                }}
            /> */}
        </div>

    )
}

export default UserListComponent;
