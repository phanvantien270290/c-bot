import React, { ReactNode } from 'react';
import Box from '@mui/material/Box';

interface TabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    index: any;
    value: any;
    isReRender?: boolean;
}

export const TabPanel: React.FC<TabPanelProps> = (props): any => {
    const { children, value, index, isReRender = true, ...other } = props;
    const retrieveLayout = () => {
        if (isReRender && value === index) {
            return <Box p={3} >
                {children}
            </Box>
        }
        if (!isReRender) {
            return <Box p={3} >
                {children}
            </Box>
        }

    }
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`container-tabpanel-${index}`}
            aria-labelledby={`container-tab-${index}`}
            {...other}
        >
            {retrieveLayout()}
        </div>
    );
}