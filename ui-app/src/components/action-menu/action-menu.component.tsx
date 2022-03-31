/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date Aug 1 2020
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 */

import React from 'react';
import { makeStyles, createStyles } from '@mui/styles';
import Grid from '@mui/material/Grid';
import ActionMenuLeftComponent from './action-menu-left.component';
import ActionMenuRightComponent from './action-menu-right.component';
import { TypeActionProps } from './action-menu-interface';
import { Theme } from '@mui/material/styles';
import MuiGrid from '../mui-grid.component';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginBottom: theme.spacing(1)
    },
  }),
);

const ActionMenuComponent: React.FC<TypeActionProps<any>> = React.memo(({ leftAction = [], rightAction = [], style }): any => {
  const classes = useStyles();
  // const leftActions: LeftItemProps<any>[] = [
  //     {
  //         tooltip: 'save',
  //         onClick: (event: any, rowData: any): any => console.log(rowData)
  //     }
  // ]
  //className={classes.root} container spacing={3} justify='space-between' style={style}
  return (
    <MuiGrid className={classes.root} container spacing={3} justifyContent="space-between" style={style} >
      <ActionMenuLeftComponent actions={leftAction} />
      <ActionMenuRightComponent actions={rightAction} />
    </MuiGrid>

  )
});
export default ActionMenuComponent;
export * from "./action-menu-interface";