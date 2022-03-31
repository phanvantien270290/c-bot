/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date June 16, 2020
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 */

import React from 'react';
import { FormControl, InputLabel, Select, SelectProps } from '@mui/material';

const IMuiSelect: React.FC<SelectProps> = (props) => {
    const { label, labelId, children, margin, ...other } = props;
    return (
        <FormControl variant="outlined" margin={margin} fullWidth size="small">
            <InputLabel id={labelId}>{label}</InputLabel>
            <Select
                labelId={labelId}
                label={label}
                {...other}>
                {children}
            </Select>
        </FormControl>
    );
}

export default IMuiSelect;
