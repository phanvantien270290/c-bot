/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date May 01, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

import React from 'react';
import MuiDrawer, { DrawerProps as MuiDrawerProps } from '@mui/material/Drawer';
import { styled, Theme, CSSObject } from '@mui/material/styles';
import NavListComponent from '../components/nav-list.component';
import DrawerHeader from '../../../components/drawer-header.component';
import { DRAWER_MENU } from '../../../utils/enum.util';
interface IDrawerProps extends MuiDrawerProps {
}
const openedMixin = (theme: Theme): CSSObject => ({
    width: DRAWER_MENU.WIDTH,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',

    width: `calc(${theme.spacing(6)} + 1px)`,
    // [theme.breakpoints.up('sm')]: {

    // },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: DRAWER_MENU.WIDTH,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),

    }),
);
const DrawerComponent: React.FC<IDrawerProps> = (props) => {
    const { open = true, onMouseEnter, onMouseLeave, ...otherProps } = props;
    return (
        <Drawer
            variant="permanent"
            anchor="left"
            open={open}
            PaperProps={{ sx: { backgroundColor: "secondary.dark", color: "secondary.contrastText" } }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            {...otherProps}
        >
            <DrawerHeader />
            <NavListComponent openDrawer={open} />
        </Drawer>
    );
}

export default DrawerComponent;