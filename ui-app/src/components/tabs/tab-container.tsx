import React, { useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// import { TabPanel } from './tab-panel';

function a11yProps(index: string | number) {
    return {
        id: `container-tab-${index}`,
        'aria-controls': `container-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));
export interface ITabProps<attrsComponent extends object> {
    tabActived: string | number,
    tabs: {
        label?: string,
        disabled?: boolean,
        hidden?: boolean,
        index: string | number,
        ChildComponent: React.ElementType;
        propsComponent?: attrsComponent
    }[]
}
interface ITabContainerProps extends ITabProps<any> {
    children?: React.ReactNode,
    onChangeTab: (newValue: number) => void
}
export const TabContainer: React.FC<ITabContainerProps> = ({ children, tabActived = 0, onChangeTab, tabs, ...props }: ITabContainerProps) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(tabActived);
    const handleChange = (event: React.ChangeEvent<{}>, newTabActive: number) => {
        if (value === newTabActive) return;
        setValue(newTabActive);
        onChangeTab && onChangeTab(newTabActive);
    };
    useEffect(() => {
        setValue(tabActived);
    }, [tabActived])
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="tabs container">
                    {tabs && tabs.map((tab, indx: number) => <Tab key={tab.label} label={tab.label} {...a11yProps(tab.index)} />)}
                </Tabs>
            </AppBar>
            {children}
        </div>
    );
}
