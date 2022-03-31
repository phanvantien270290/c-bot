import React from 'react';

import { Grid, GridProps } from '@mui/material';

const MuiGrid: React.FC<GridProps> = ({ children, ...props }) => {

    return <Grid  {...props} paddingLeft={0} >{children}</Grid>
}
export default MuiGrid