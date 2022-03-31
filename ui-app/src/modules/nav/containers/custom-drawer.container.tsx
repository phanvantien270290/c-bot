/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date May 01, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

import React, { useCallback, useState } from 'react';
import Box from '@mui/system/Box';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '../components/app-bar.component';
import Drawer from '../components/drawer.component';
import Main from '../components/main.component';
import DrawerHeader from '../../../components/drawer-header.component';

let timeOutId: any = null;

export const CustomDrawer: React.FC<any> = (props) => {

    const [open, setOpen] = useState(true);
    const [focusOpen, setFocusOpen] = useState(false);
    const openDrawer = () => {
        setOpen(true);
    };

    const closeDrawer = () => {
        setOpen(false);
    };
    const focusOpenFn = () => {
        clearTimeout(timeOutId);
        setFocusOpen(isFocus => !isFocus);
        toggleDrawer();
    }
    const onMouseToggleMenu = (eventName: "onMouseEnter" | "onMouseLeave") => {
        if (!focusOpen) {
            clearTimeout(timeOutId);
            if (eventName === "onMouseEnter") {
                timeOutId = setTimeout(() => {
                    openDrawer();
                }, 300);
            }
            if (eventName === "onMouseLeave") {
                closeDrawer();
            }
        }
    }
    const toggleDrawer = useCallback(() => {
        setOpen(open => !open);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open])
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar onClick={focusOpenFn} open={open} />
            <Drawer open={open}
                onMouseEnter={onMouseToggleMenu.bind(null, 'onMouseEnter')}
                onMouseLeave={onMouseToggleMenu.bind(null, 'onMouseLeave')}
            />
            <DrawerHeader />
            <Main open={open} />
        </Box>
    );
}

export default CustomDrawer;