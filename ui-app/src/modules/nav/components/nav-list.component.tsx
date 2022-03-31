/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date May 06, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import React, { useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';
import MuiList from '@mui/material/List';
import { styled } from '@mui/material/styles';
import NavItemComponent from './nav-item.component';


interface INavProps {
    openDrawer: boolean
}


const List = styled(MuiList, {
    shouldForwardProp: (prop) => prop !== 'open',
})<{
    component?: React.ElementType
    open?: boolean;
}>(({ theme, open }) => ({
    '& .MuiListItemIcon-root': {
        minWidth: 48,
    },
    '&  .MuiListItem-root': {
        transition: theme.transitions.create(['padding'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            transition: theme.transitions.create(['padding'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    },

}));


const getNavList = (list: INavItem[]) => {
    const parentNavItem = _.sortBy(list.filter((item: INavItem) => !item.parentId), 'order', 'DESC');
    const subNavItem = list.filter((item: INavItem) => item.parentId);
    const getFullNavITem = parentNavItem.map((p) => {
        p.children = _.sortBy(subNavItem.filter((subNav) => subNav.parentId === p.id), 'order', 'DESC');
        return p;
    });
    return getFullNavITem
};

const NavListComponent: React.FC<INavProps> = ({ openDrawer, ...props }) => {
    const data = useSelector((state: IState) => {
        return state.nav.data || [];
    });
    const navList = getNavList(data);
    useLayoutEffect(() => {

    }, [])
    return (
        <>
            {navList.length
                ? <List component="nav" open={openDrawer}> {
                    navList.map((item, index) => <NavItemComponent openDrawer={openDrawer} item={item} key={`${item.id}-${index}`} />)
                }</List>
                : 'Loading'}
        </>
    );
}


export default React.memo(NavListComponent);