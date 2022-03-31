import React from 'react';
import {
    TreeView
} from '@mui/lab';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import {
    RadioButtonUnchecked,
    RadioButtonChecked
} from '@mui/icons-material';
import NavigationItemComponent from './navigation-item.component';
import { navigationItemStyle } from '../assets/permission.style';
import { sortListAscending } from '../../../utils/helper';

interface NavigationStyleInterface {
    label?: { fontWeight: number };
    group?: { border: string }
}

const NavigationListComponent = (props: any) => {
    const navigationClasses: any = navigationItemStyle();
    const navigationList = sortListAscending(props.navigationList, 'id');

    const handleExpandTreeView = () => { }
    const handleNodeSelect = () => { }
    const getParentItemsWithoutChildren = () => {
        let parentItemsWithoutChildren = navigationList.filter((navigationItem: INavItem) => {
            return navigationItem.private && !navigationItem.children && !navigationItem.parentId;
        });
        return parentItemsWithoutChildren
    }
    const getParentItems = () => {
        let parentItems = navigationList.filter((navigationItem: INavItem) => {
            return !navigationItem.path && navigationItem.children && navigationItem.children.length > 0;
        });
        return parentItems;
    }
    const handleClickOnLabel = (navId: string): void => {
        props.clickOnLabel(navId);
    }
    const handleClickOnIcon = (navId: string): void => {
        props.clickOnIcon(navId);
    }
    const getNavItemIcon = (navId: string) => {
        return (navId === props.navId) ? <RadioButtonChecked /> : <RadioButtonUnchecked />;
    }

    const getNavItemClasses = (navId: string): string => {
        return (navId === props.navId) ? 'fontBold' : 'fontNormal';
    }

    const renderChildrenItem = (childrenItems: INavItem[]) => {
        let childrenItemsSorted: INavItem[] = sortListAscending(childrenItems, 'id');
        return (
            childrenItemsSorted.map((childrenItem, index) => {
                let navId = childrenItem.id || '';
                let navigationItemClasses: NavigationStyleInterface = {
                    label: navigationClasses[getNavItemClasses(navId)]
                };
                return (
                    <NavigationItemComponent
                        className={navigationClasses.group}
                        classes={navigationItemClasses}
                        icon={getNavItemIcon(navId)}
                        onIconClick={() => handleClickOnIcon(navId)}
                        onLabelClick={() => handleClickOnLabel(navId)}
                        key={index}
                        nodeId={navId} label={childrenItem.name}
                    />
                )
            })
        );
    }
    const parentItems: INavItem[] = getParentItems();
    const parentItemsWithoutChildren: INavItem[] = getParentItemsWithoutChildren();

    return (
        <TreeView
            className={navigationClasses.root}
            defaultCollapseIcon={<RemoveIcon />}
            defaultExpandIcon={<AddIcon />}
            defaultEndIcon={<RadioButtonUnchecked />}
            defaultExpanded={parentItems ? [parentItems[0].id] : []}
            onNodeToggle={handleExpandTreeView} onNodeSelect={handleNodeSelect}
        >
            {parentItems.map((parentItem: INavItem, index: number) => {
                return (
                    <NavigationItemComponent
                        key={index} nodeId={parentItem.id} label={parentItem.name}>
                        {renderChildrenItem(parentItem.children || [])}
                    </NavigationItemComponent>
                )
            })}
            {parentItemsWithoutChildren.map((parentItem: INavItem, index: number) => {
                return (
                    <NavigationItemComponent
                        icon={getNavItemIcon(parentItem.id)}
                        onIconClick={() => handleClickOnIcon(parentItem.id)}
                        onLabelClick={() => handleClickOnLabel(parentItem.id)}
                        key={index}
                        nodeId={parentItem.id} label={parentItem.name}
                    />
                )
            })}
        </TreeView>
    )
}

export default NavigationListComponent;
