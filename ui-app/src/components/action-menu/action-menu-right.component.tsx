/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date June 16, 2020
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 * Example using :
 *   // const actions: MenuItemProps<any>[] = [
    //     {
    //         title: 'foo',
                ...
    //         icon: 'export',
    //         onClick: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => { console.log("!exported") },
    //     }
    // ]
 */

import React from 'react';
import { MenuActionProps } from './action-menu-interface';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import MenuList from '@mui/material/Menu';
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";

const ITEM_HEIGHT = 48;
const ActionMenuRightComponent: React.FC<MenuActionProps<any>> = ({ actions = [], children }) => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event?: React.MouseEvent<HTMLElement>, onClick?: any) => {
        if (typeof onClick === 'function') {
            onClick(event);
        }
        setAnchorEl(null);
    };
    const getIcon = (icon: any) => {
        return (icon && typeof icon !== 'string') ? icon : <Icon>{icon}</Icon>;
    }
    return (
        <div style={{ paddingRight: 20 }}>
            {!actions.length ? null : (
                <React.Fragment>
                    <IconButton
                        aria-label="more"
                        aria-controls="long-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <MenuList
                        id="long-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={open}
                        onClose={(event: any) => handleClose(event)}
                        PaperProps={{
                            style: {
                                maxHeight: ITEM_HEIGHT * 4.5,
                                width: 'auto',
                            },
                        }}
                    >
                        {actions.map(({ title, disabled, icon, onClick }) => (
                            <MenuItem
                                key={title}
                                disabled={!!disabled}
                                onClick={(event: any) => handleClose(event, onClick)}
                            >
                                <ListItemIcon style={{ minWidth: 35 }}>
                                    {getIcon(icon)}
                                </ListItemIcon>
                                <Typography variant="inherit" noWrap>
                                    {title}
                                </Typography>
                            </MenuItem>
                        ))}
                    </MenuList>
                </React.Fragment>
            )}
        </div>
    );
}
export default ActionMenuRightComponent;