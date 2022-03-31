/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date Nov 09, 2020
 * @contributors
 *      Phat Le <phat.le@ccintegration.com>
 */

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useSnackbar } from "notistack";
import { makeStyles } from '@mui/styles';
import {
    Grid,
    Typography
} from '@mui/material';

import NavigationListComponent from '../components/navigation-list.component';
import UserListComponent from '../components/user-list.component';

import { getApi, postApi } from '../../../services/api';
import { IUserInterface } from '../../../interfaces/user.interface';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    headerRoot: {
        marginBottom: '20px'
    },
    headerMember: {
        backgroundColor: '#fff',
        borderBottom: 'none'
    },
    tableContainer: {
        padding: '10px'
    },
    button: {
        textAlign: 'right',
        paddingTop: '30px'
    },
    gridRoot: {
        borderRight: '1px solid gray'
    },
    permissionContainer: {
        border: '1px solid lightgray',
        textAlign: 'left',
        padding: '20px'
    },
    fontBold: {
        fontWeight: 700
    },
    userListContainer: {
        padding: '0 20px'
    }
}));

const PermissionContainer = (props: any) => {
    const navigationList: INavItem[] = props.navigationList || [];
    const classes = useStyles();
    const [currentNavId, setCurrentNavId] = useState('');
    const [navigationUsers, setNavigationUsers] = useState<string[]>([]);

    const { enqueueSnackbar } = useSnackbar();

    const handleMenuNavigation = (navId: string) => {
        let params = { searchFields: { id: navId.toUpperCase() } };
        getApi('/api/user-navigation/retrieve', params).then((result: any) => {
            if (result.status && result.data) {
                setCurrentNavId(navId);
                setNavigationUsers(result.data.users);
            }
        });
    }

    const handleClickOnLabel = (navId: string) => {
        handleMenuNavigation(navId);
    }
    const handleClickOnIcon = (navId: string) => {
        handleMenuNavigation(navId);
    }

    const handleSaveUser = (users: IUserInterface[]) => {
        let newSelectedUserList = [...navigationUsers];
        for (const i in users) {
            let user = users[i];
            let userIndex = newSelectedUserList.indexOf(user.loginname);
            if (user.checked !== undefined) {
                if (userIndex !== -1 && !user.checked) {
                    newSelectedUserList.splice(userIndex, 1);
                } else if (user.checked) {
                    newSelectedUserList.push(user.loginname);
                }
            }
        }
        postApi('/api/user-navigation/update', {
            "searchFields": {
                "id": currentNavId.toUpperCase()
            },
            "data": {
                "users": newSelectedUserList
            }
        }).then((res: any) => {
            if (res.status) {
                setNavigationUsers(newSelectedUserList);
                enqueueSnackbar('Saved successfully', { variant: 'success' });
            } else {
                enqueueSnackbar('Saved unsuccessfully', { variant: 'error' });
            }
        });
    }

    const renderUserListComponent = () => {
        return (
            <Grid item xs={9} className={classes.userListContainer}>
                <UserListComponent
                    navId={currentNavId}
                    saveUser={handleSaveUser}
                    navigationUsers={navigationUsers}
                />
            </Grid>
        )
    }

    return (
        <Grid container className={classes.root}>
            <Grid item xs={3} className={classes.permissionContainer}>
                <Typography className={classes.fontBold} variant="h4" paragraph={true}>Permission list</Typography>
                <NavigationListComponent
                    navigationList={navigationList} navId={currentNavId}
                    clickOnLabel={(navId: string) => handleClickOnLabel(navId)}
                    clickOnIcon={(navId: string) => handleClickOnIcon(navId)}
                />
            </Grid>
            {renderUserListComponent()}
        </Grid>
    )
}

const mapStateToProps = (state: IState) => {
    return {
        navigationList: state.nav.data || []
    }
};

export default connect(mapStateToProps, null, null, {})(PermissionContainer);
