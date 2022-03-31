/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date June 16, 2020
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 */

import React from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';

export interface IOptions {
    upercase?: boolean,
    blockCharSpecial?: boolean,
}
export interface IMuiTextFieldProps {
    loading?: boolean,
    regexReplace?: {
        regex: RegExp | string,
        replace: string
    },
    options?: IOptions,
    labelContext?: any;
}
const IMuiTextField: React.FC<TextFieldProps & IMuiTextFieldProps> = (props) => {
    const { onChange, regexReplace, options = {}, ...other } = props;
    const { upercase } = options;
    const handleOnChange = (event: any) => {
        let _value = event.target.value;
        if (regexReplace && _value) {
            _value = _value.replace(regexReplace.regex, regexReplace.replace);
        }
        if (_value && upercase) {
            _value = _value.toUpperCase();
        }
        event.target.value = _value;
        onChange && onChange(event);
    };
    return (
        <TextField
            size="small"
            variant='outlined'
            onChange={handleOnChange}
            {...other} />
    );
}

export default IMuiTextField;
