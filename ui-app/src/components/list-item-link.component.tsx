/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date May 06, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

import React from 'react';
import {
    useLocation,
    Link as RouterLink,
    LinkProps as RouterLinkProps,
} from 'react-router-dom';
import {
    ListItem,
    ListItemBaseProps,
    ListItemIcon,
    ListItemText,
    ListItemIconProps,
    ListItemTextProps,
} from '@mui/material';
import IconComponent from './icon.component';
import { ID_MENU } from '../utils/enum.util';
interface ListItemLinkProps {
    icon?: React.ReactElement;
    primary: string;
    to: string;
    id: ID_MENU;
    itemBaseProps?: ListItemBaseProps;
    itemIconProps?: ListItemIconProps;
    itemTextProps?: ListItemTextProps
}

function ListItemLink(props: ListItemLinkProps) {
    const { primary, to, itemBaseProps = {}, id, itemIconProps, itemTextProps } = props;
    const location = useLocation();
    const renderLink = React.useMemo(
        () =>
            React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, 'to'>>(
                (itemProps, ref) => <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />
            ),
        [to],
    );
    let sxx = {};
    if (to === location.pathname) {
        sxx = { borderRadius: 10, backgroundColor: "primary.main", ":hover": { backgroundColor: "primary.main" } }
    }
    return (
        <ListItem {...itemBaseProps} button component={renderLink}
            sx={{ ...itemBaseProps?.sx, ...sxx }}
            id={id}
        >
            {<ListItemIcon {...itemIconProps}><IconComponent id={id} /></ListItemIcon>}
            <ListItemText primary={primary} {...itemTextProps} />
        </ListItem>
    );
}




export default ListItemLink