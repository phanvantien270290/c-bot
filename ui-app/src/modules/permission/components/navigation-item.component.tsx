import React from 'react';
import {
    TreeItem
} from '@mui/lab';
import NavigationTransitionComponent from './navigation-transition.component';

const NavigationItemComponent = (props: any) => {
    return (
        <TreeItem
            {...props}
            TransitionComponent={NavigationTransitionComponent}
        />
    )
}

export default NavigationItemComponent;
