import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider, { LocalizationProviderProps } from '@mui/lab/LocalizationProvider';
import DesktopDatePicker, { DesktopDatePickerProps } from '@mui/lab/DesktopDatePicker';

interface IMuiDesktopDatePicker extends Omit<DesktopDatePickerProps, "renderInput"> {
    localizationProviderProps?: LocalizationProviderProps;

}
const MuiDesktopDatePicker: React.FC<IMuiDesktopDatePicker> = ({ localizationProviderProps, ...props }) => {
    return (
        <LocalizationProvider {...localizationProviderProps} dateAdapter={AdapterDateFns} >
            <DesktopDatePicker
                {...props}
                renderInput={(params) => <TextField {...params} size="small" fullWidth variant="outlined" />} />
        </LocalizationProvider>
    );
}
export default MuiDesktopDatePicker