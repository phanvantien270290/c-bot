/**
 * @owner BlueSky
 * @description 
 * @since 1.0.0
 * @date Apr 28, 2020
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 */

import { Box, Grid } from '@mui/material';
import React from 'react';
import Skeleton from '@mui/material/Skeleton';

import WorkLogContainer from './worklog/worklog.component'
interface ItemProps {
}

const DashBoard = (props: ItemProps) => {
    return (
        <>
            <Box>
                <Grid container spacing={2} >
                    <Grid container spacing={3} >
                        <Grid item lg={12} xs={12}>
                            <WorkLogContainer />
                        </Grid>
                    </Grid>
                    <Grid item lg={4}
                        md={6}
                        xl={3}
                        xs={12} >
                        <Skeleton variant='rectangular' width={"100%"} height={"100%"} />
                    </Grid>
                    <Grid item lg={8}
                        md={12}
                        xl={9}
                        xs={12} >
                        <Skeleton variant="rectangular" width={"100%"} height={"100%"} />
                        {/* <LatestPrinted /> */}
                    </Grid>

                </Grid>
            </Box>
        </>
    );
}
export default DashBoard