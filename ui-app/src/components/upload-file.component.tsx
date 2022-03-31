/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date Aug 1 2020
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 */

import React, { useEffect, useState, useRef } from 'react';
import Button from '@mui/material/Button';
import { useSnackbar } from "notistack";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { PropTypes, TextField, FormHelperText, TextFieldProps, IconButton } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment/InputAdornment';
import { makeStyles, createStyles } from '@mui/styles';
import { Theme } from '@mui/system/createTheme';

const msgFileError = {
    notFound: 'Please select file',
    allowField: 'Please select allowed files',
    overSize: 'Please select  file less than %s %u'

}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            alignItems: 'center'
        },
        hideInput: {
            display: 'none',
        },
        inputTexField: {
            marginRight: theme.spacing(1),
            width: "100%",
            position: "relative"
        },
        // label: {
        //     marginTop: 3,
        // },
        button: {
            padding: `${theme.spacing(1)} ${theme.spacing(2)}`
        },
        buttonNoWrapText: {
            whiteSpace: "nowrap"
        },
        closeButton: {
            padding: 0,
            userSelect: "none",
            fontSize: 18,
            cursor: "pointer",
            color: 'grey',
            position: 'absolute',
            top: "calc(50% - 10px)",
            right: 8,
        },

    }),
);

interface IUploadFileProps {
    titleButton?: string,
    disabled?: boolean,
    accept?: string,
    color?: PropTypes.Color,
    id?: string,
    hiddenInput?: boolean,
    limit?: { maxSize: number, capilityUnit: 'B' | 'KB' | 'MB' | 'GB' }
    helperText?: string,
    multiple?: boolean,
    convertToBase64?: boolean,
    value?: any,
    register?: any,
    buttonTextNoWrap?: boolean,
    extensions?: string | string[],
    onChange?: (event?: any) => void,
    onClick?: (event: any) => void,
    propsTextField?: TextFieldProps
}
export interface IFileSelectorProps {
    mimeType: string,
    name: string,
    base64: string,
    size?: number
}
// const imgFileRegex = (/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i);
// const nlblFileRegex = (/\.(nlbl)$/i);
const FileSelector: React.FC<IUploadFileProps> = (props) => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const inputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState('');
    const {
        accept = "*",
        color = "secondary",
        id = "contained-button-file",
        titleButton = 'Upload',
        multiple = false,
        helperText,
        extensions,
        limit = { maxSize: 0, capilityUnit: 'KB' },
        convertToBase64 = false,
        hiddenInput = false,
        propsTextField,
        onChange,
        onClick,
        buttonTextNoWrap = false,
        // ...others
        // isReset,
    } = props;
    // const bytesToSize = (bytes: number, unit: string): string | number => {
    //     const i = parseInt("" + Math.floor(Math.log(bytes) / Math.log(1024)), 10)
    //     if (i === 0) return bytes;
    //     return (bytes / (1024 ** i)).toFixed(1);
    // }

    const getExtensionFile = (filename: string = ''): string => {
        return (filename.split('.').pop() || '').toLowerCase();
    }
    const bytesToSize = (bytes: number = 0, unit: string): number => {
        let units = ['B', 'KB', 'MB', 'GB'];
        const i = units.findIndex((un) => un === unit) || 0;
        return Math.floor(bytes / (1024 ** i));
    }
    const handleOnChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        let fileSelected: IFileSelectorProps = {
            size: 0,
            mimeType: '',
            name: '',
            base64: ''
        }
        const errorMsg = validFile(event.target.files);
        setError(errorMsg);
        if (errorMsg || !event.target.files) {
            return enqueueSnackbar(errorMsg, { variant: 'error' })
        }
        if (convertToBase64) {
            fileSelected = await toBase64(event.target.files[0]);
            fileSelected.name && onChange && onChange(fileSelected);
        } else {
            onChange && onChange(event.target.files[0]);
        }

    }

    const handleOnRemove = () => {
        let dataEmpty: any = { name: '', file: null }
        if (convertToBase64) {
            dataEmpty = { type: '', name: '', base64: '' }
        }
        onChange && onChange(dataEmpty);
    }
    const validFile = (files: FileList | null): string => {
        if (!files || !files.length) {
            return msgFileError.notFound;
        }
        const ex = getExtensionFile(files[0].name);
        if (extensions && !extensions?.includes(ex)) {
            return msgFileError.allowField;
        }

        const size = bytesToSize(files[0].size, limit.capilityUnit);
        if (limit.maxSize && size > limit.maxSize) {
            return msgFileError.overSize.replace('%s', limit.maxSize.toString()).replace('%u', limit.capilityUnit)
        }
        return '';
    }
    const handleOnClick = (event: React.FormEvent<HTMLInputElement>) => {
        onClick && onClick(event);
    }
    const toBase64 = (file: File) => new Promise<IFileSelectorProps>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            resolve({
                mimeType: file.type,
                name: file.name,
                base64: reader.result as string
            });
        }

        reader.onerror = error => reject('Can not read file');
    });

    useEffect(() => {
        setError('');

    }, [propsTextField]);

    return (
        <div >
            <div className={classes.root}>
                <input
                    accept={accept}
                    className={classes.hideInput}
                    id={id}
                    ref={inputRef}
                    onChange={handleOnChange}
                    multiple={multiple}
                    type="file"
                    disabled={propsTextField && propsTextField.disabled}
                    value=""
                />
                {!hiddenInput &&
                    (
                        <div className={classes.inputTexField}>
                            <TextField
                                size="small"
                                variant="outlined"
                                value={''}

                                {...propsTextField}
                                InputProps={{
                                    readOnly: true,
                                    endAdornment: (propsTextField && propsTextField.value && !propsTextField.disabled) ? (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="add oem_sn end field"
                                                onClick={handleOnRemove}
                                                style={{ padding: 0 }}
                                            >
                                                <CloseOutlinedIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    ) : null
                                }}

                            />
                            {/* {(propsTextField && propsTextField.value && !propsTextField.disabled) &&
                                <IconButton onClick={handleOnRemove} className={classes.closeButton} aria-label="Clear file">
                                    <CloseOutlinedIcon />
                                </IconButton>} */}
                        </div>
                    )}
                <label htmlFor={id} >
                    <Button
                        disabled={propsTextField && propsTextField.disabled}
                        onClick={(event: any) => { handleOnClick(event) }}
                        variant="contained"
                        fullWidth
                        className={buttonTextNoWrap ? classes.buttonNoWrapText : ''}
                        color="secondary"

                        component="span">

                        {titleButton}
                    </Button>
                </label>
            </div>
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
            {error && <FormHelperText error={!!error}>{error}</FormHelperText>}
        </div>
    );
}
export default FileSelector