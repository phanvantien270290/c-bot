/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date Mar 02, 2021
 * @contributors
 *      Phat Le <phat.le@ccintegration.com>
 */

import React from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
// import DateFnsUtils from '@date-io/date-fns';
import { STATUS_DEVICE, status_css } from '../../../utils';
import { IApiTokenSearchForm } from '../../../interfaces/api-token.interface';
import MuiGrid from '../../../components/mui-grid.component';
import { MuiDesktopDatePicker } from '../../../components';
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        ...status_css
    }),
);



const APITokenSearchFormComponent = (props: IApiTokenSearchForm) => {
    const { inputNameRef, searchParams, onChangeApiTokenName, onChangeApiTokenDate, onChangeApiTokenStatus } = props;
    const classes = useStyles();

    const handleChangeStatus = (e: any) => {
        onChangeApiTokenStatus(e.target.value)
    }
    const handleKeyPress = (e: any) => {
        if (e.which === 13) {
            onChangeApiTokenName(e.target.value);
        }
    }
    const handleChangeDate = (date: unknown, keyboardInputValue?: string | undefined) => {
        onChangeApiTokenDate(date as Date | null);
    }

    return (
        <MuiGrid container spacing={3} style={{ marginBottom: '20px' }} >
            <MuiGrid item xs={12} md={4}>
                <TextField
                    type="text" variant="outlined" label="Name" size="small" fullWidth inputRef={inputNameRef}
                    onKeyPress={handleKeyPress}
                />
            </MuiGrid>
            <MuiGrid item xs={12} md={4} >
                <FormControl variant="outlined" fullWidth size="small">
                    <InputLabel id="obsoleted-label">Status</InputLabel>
                    <Select
                        style={{ textAlign: 'left' }}
                        labelId="obsoleted-label"
                        name="obsoleted"
                        disabled={false}
                        onChange={handleChangeStatus}
                        label="Status"
                        value={searchParams.searchFields?.obsoleted}
                    >
                        <MenuItem value={STATUS_DEVICE.ACTIVE} className={classes.active}>{STATUS_DEVICE.ACTIVE}</MenuItem>
                        <MenuItem value={STATUS_DEVICE.INACTIVE} className={classes.inactive}>{STATUS_DEVICE.INACTIVE}</MenuItem>
                    </Select>
                </FormControl>
            </MuiGrid>
            <MuiGrid item xs={12} md={4} >
                <MuiDesktopDatePicker
                    label="Expired Date"
                    inputFormat="MM/dd/yyyy"
                    value={searchParams.searchFields?.expiredAt}
                    onChange={handleChangeDate}
                />
            </MuiGrid>
        </MuiGrid >
    )
}

export default APITokenSearchFormComponent;
