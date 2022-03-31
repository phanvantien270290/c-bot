/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date May 06, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

import React from 'react';

import List from '@mui/material/List';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { ListItemButton, SxProps } from '@mui/material';
import StarBorder from '@mui/icons-material/StarBorder';
import { IconComponent, ListItemLink } from '../../../components';
import { ID_MENU } from '../../../utils/enum.util';

interface INavItemProps {
    openDrawer: boolean,
    item: INavItem
}



const NavItem: React.FC<INavItemProps> = ({ openDrawer, item }) => {
    const [open, setOpen] = React.useState(true);
    const onClick = (e: any) => {
        setOpen(!open);
    }
    const sxButton: SxProps = { justifyContent: openDrawer ? "initial" : "center" };
    const sxIcon: SxProps = { minWidth: 0, justifyContent: "center", color: "inherit" }
    const sxText: SxProps = { display: "block" };


    if (item.path) {
        return (<ListItemLink
            itemIconProps={{ sx: sxIcon }}
            itemTextProps={{ sx: sxText }}
            itemBaseProps={{ sx: { ...sxButton } }}
            to={item.path} primary={item.name} id={item.id} icon={<StarBorder />}
        />)
    }
    return (
        <React.Fragment>
            <ListItemButton onClick={onClick} sx={sxButton}>
                {<ListItemIcon sx={sxIcon}><IconComponent id={item.id} /></ListItemIcon>}
                <ListItemText primary={item.name} sx={sxText} />
                {openDrawer && (open ? <ExpandLess /> : <ExpandMore />)}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {
                        item.children?.map((subItem: INavItem) => subItem.path
                            && <ListItemLink
                                itemIconProps={{ sx: sxIcon }}
                                itemTextProps={{ sx: sxText }}
                                itemBaseProps={{ sx: { ...sxButton, pl: openDrawer ? 4 : 2 } }}
                                id={subItem.id as ID_MENU}
                                key={`subMenu-${subItem.id}`} to={subItem.path}
                                primary={subItem.name} icon={<StarBorder />}
                            />)
                    }
                </List>
            </Collapse>
        </React.Fragment>
    )
}

const NavItemComponent: React.FC<INavItemProps> = ({ item, openDrawer }) => {

    return <NavItem item={item} key={'mui-nav-' + item.id} openDrawer={openDrawer} />

}



export default React.memo(NavItemComponent);