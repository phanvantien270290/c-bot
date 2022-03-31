/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date Aug 1 2020
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 */

import React from 'react';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';

function TypographyDemo(props: { numberRender: number, loading?: boolean }) {
    // const { loading = false } = props;
    // let variants  ;
    const renderSkeleton = (): any[] => {
        let list = [];
        for (let i = 0; i < props.numberRender; i++) {
            list.push(
                <Grid item xs={12} md={6} key={i + props.numberRender} >
                    <Skeleton animation="wave" />
                </Grid>
            )

        }
        return list;
    }
    return (
        <>
            {renderSkeleton()}
        </>
    );
}

export default function SkeletonControl(props: { numberRender: number }) {
    return (
        <Grid container spacing={2} >
            <TypographyDemo  {...props} />
        </Grid>
    );
}
