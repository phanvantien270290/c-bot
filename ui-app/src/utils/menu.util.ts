import React from 'react';
import {
    Dashboard, Home, HowToReg, Info, LockOpen,
    SupervisedUserCircle, VpnKey,
    // LineStyle,
    // Print,
    // LocalPrintshop,
    MoreHoriz,
    // Label,
    // AccountTree
} from '@mui/icons-material';
import { ReactComponent as DozukiIcon } from '../assets/images/icons/dozuki.svg';
import { ID_MENU } from './enum.util';

const ICON_MENU: { [key in ID_MENU]: any } = {
    [ID_MENU.ABOUT]: Info,
    [ID_MENU.DASHBOARD]: Dashboard,
    [ID_MENU.APITOKEN]: VpnKey,
    [ID_MENU.PERMISSIONMANAGEMENT]: HowToReg,
    [ID_MENU.ADMINISTRATION]: SupervisedUserCircle,
    [ID_MENU.NOT_FOUND]: MoreHoriz,
    [ID_MENU.DOZUKI]: DozukiIcon,
    [ID_MENU.ERROR_PAGE]: LockOpen,
    [ID_MENU.LOGIN]: undefined
}
const getMenuIconMat = (id: ID_MENU) => {
    return ICON_MENU[id] || Home
}

export { ID_MENU, ICON_MENU, getMenuIconMat };
