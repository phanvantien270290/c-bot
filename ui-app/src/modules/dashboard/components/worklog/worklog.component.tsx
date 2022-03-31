import React, { useEffect } from 'react'
import Grid from '@mui/material/Grid';

import WorklogListView from './list-view';
import WorklogChart from './chart';
import WorklogToolbar from './toolbar'
const WorkLogContainer: React.FC<any> = (props: any) => {


    useEffect(() => {

    }, [])


    return <Grid container spacing={2}>
        <Grid item xs={12}>
            <WorklogToolbar />
        </Grid>
        <Grid item xs={12}>
            <WorklogChart />
        </Grid>
        <Grid item xs={12}>
            <WorklogListView />
        </Grid>

    </Grid>
}

export default WorkLogContainer