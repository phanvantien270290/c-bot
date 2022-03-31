import React, { useRef, useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Grid,
    TextField,
    Button,
    DialogActions,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    IconButton,
    Tooltip
} from '@mui/material';
import FilterNoneIcon from '@mui/icons-material/FilterNone';
// import {
//     MuiPickersUtilsProvider,
//     KeyboardDatePicker,
// } from '@material-ui/pickers';
// import DateFnsUtils from '@date-io/date-fns';
import { Theme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import { useSnackbar } from 'notistack';

import { STATUS_DEVICE, status_css } from '../../../utils';
import { createAPIToken, updateAPIToken } from '../store/services';
import { IAPITokenDialogProps } from '../../../interfaces/api-token.interface';
import { MuiDesktopDatePicker } from '../../../components';

interface IFieldProps {
    error: boolean;
    value: string | Date;
    errorMsg: string;
    required?: boolean;
}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        ...status_css,
        header: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        root: {
            flexGrow: 1,
            textAlign: "left",
            marginBottom: theme.spacing(3)
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        button: {
            padding: theme.spacing(0),
        },
        indicate: {
            width: "100%",
            padding: theme.spacing(1),
            backgroundColor: '#cecece',
            borderRadius: 4,
            height: 56,

        }
    }),
);
const apiTokenInitialize = {
    id: '',
    app: '',
    expiredAt: new Date(),
    obsoleted: true,
    token: ''
}

const APITokenDialog = (props: IAPITokenDialogProps) => {
    const { isOpen = false, title, data, type, onCloseDialog, onRefreshData } = props;
    const apiToken = data || apiTokenInitialize;
    const [idField, setIDField] = useState<IFieldProps>({ error: false, value: apiToken.id?.toString(), errorMsg: '', required: true });
    const [nameField, setNameField] = useState<IFieldProps>({ error: false, value: apiToken.app?.toString(), errorMsg: '', required: true });
    const [expiredDateField, setExpiredDateField] = useState({ error: false, value: apiToken.expiredAt, errorMsg: '', required: true });
    const [statusField, setStatusField] = useState({ error: false, value: apiToken.obsoleted ? STATUS_DEVICE.INACTIVE : STATUS_DEVICE.ACTIVE, errorMsg: '' });
    const [tooltipProps, setToolTipProps] = useState({ open: false, title: '', placement: 'right' as 'right', interactive: true, leaveDelay: 3000, disableHoverListener: true });

    const { enqueueSnackbar } = useSnackbar();
    const tokenFieldRef = useRef();
    const classes = useStyles();
    const propsTextDefaults = { size: 'small' as 'small', fullWidth: true, variant: 'outlined' as 'outlined' }

    const handleClose = () => {
        onCloseDialog();
    }
    // const handleKeyPress = () => { }
    // const handleChangeDate = (date: Date | null) => {
    //     setExpiredDateField({
    //         ...expiredDateField,
    //         value: date ? date : new Date()
    //     })
    // }
    const handleChangeDate = (date: unknown, keyboardInputValue?: string | undefined) => {
        setExpiredDateField({
            ...expiredDateField,
            value: (date ? date : new Date()) as Date | null
        })
    }
    const handleChangeTextField = (e: any) => {
        if (e.target.name === 'id') {
            setIDField({
                error: false,
                errorMsg: '',
                value: e.target.value
            });
        } else {
            setNameField({
                error: false,
                errorMsg: '',
                value: e.target.value
            });
        }
    }
    const handleSubmitAPIToken = () => {
        if (idField.required && idField.value === '') {
            setIDField({
                ...idField,
                error: true,
                errorMsg: 'ID is required'
            });
        }
        if (nameField.required && nameField.value === '') {
            setNameField({
                ...nameField,
                error: true,
                errorMsg: 'Name is required'
            });
        }
        if (idField.value === '' || nameField.value === '') {
            return false;
        }
        const requestData = {
            id: idField.value.toString(),
            app: nameField.value.toString(),
            expiredAt: expiredDateField.value,
            obsoleted: statusField.value === STATUS_DEVICE.INACTIVE
        }
        if (type !== 'create') {
            updateAPIToken({
                _id: data?._id,
                data: requestData
            }).then((response: any) => {
                enqueueSnackbar(response.msg, { variant: response.status ? 'success' : 'error' });
                setTimeout(() => {
                    onCloseDialog();
                    onRefreshData && onRefreshData('refresh', null);
                }, 500);
            })
        } else {
            createAPIToken({ data: requestData }).then((response: any) => {
                if (!response.status) {
                    if (response.code === 11000) {
                        return enqueueSnackbar(`API Token ID ${requestData.id} is duplicated`, { variant: 'error' });
                    }
                }
                enqueueSnackbar(response.msg, { variant: response.status ? 'success' : 'error' });
                setTimeout(() => {
                    onCloseDialog();
                    onRefreshData && onRefreshData('refresh', null);
                }, 500);
            });
        }
        return false;
    }
    const handleChangeStatus = (e: any) => {
        setStatusField({
            ...statusField,
            value: e.target.value
        })
    }
    const handleCopyText = () => {
        let inputFieldElement: any = tokenFieldRef.current;
        if (inputFieldElement) {
            inputFieldElement.removeAttribute('disabled');
            inputFieldElement.select();
            document.execCommand('copy');
            inputFieldElement.setAttribute('disabled', true);
            setToolTipProps({
                ...tooltipProps,
                open: true,
                title: 'Token is copied'
            });
        }
    }
    const handleCloseTooltip = () => {
        setToolTipProps({
            ...tooltipProps,
            open: false
        });
    }

    return (
        <Dialog
            fullWidth
            maxWidth="md"
            scroll="paper"
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent dividers>
                <Grid container spacing={2} className={classes.root} >
                    <Grid item xs={12} md={6}>
                        <TextField
                            name='id' label={'ID'} disabled={type !== 'create'} value={idField.value} required={idField.required} error={idField.error} helperText={idField.errorMsg}
                            {...propsTextDefaults} onChange={handleChangeTextField}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            name='app' label={'Name'} disabled={type === 'view'} value={nameField.value} required={nameField.required} error={nameField.error} helperText={nameField.errorMsg}
                            {...propsTextDefaults} onChange={handleChangeTextField}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <MuiDesktopDatePicker
                            label="Expired Date"
                            inputFormat="MM/dd/yyyy"
                            minDate={new Date()}
                            value={expiredDateField.value}
                            onChange={handleChangeDate}
                            disabled={type === 'view'}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl variant="outlined" fullWidth size="small">
                            <InputLabel id="obsoleted-label">Status</InputLabel>
                            <Select
                                className={""}
                                labelId="obsoleted-label"
                                name="obsoleted"
                                disabled={type === 'view'}
                                onChange={handleChangeStatus}
                                label="Status"
                                value={statusField.value}
                            >
                                <MenuItem value={STATUS_DEVICE.ACTIVE} className={classes.active}>{STATUS_DEVICE.ACTIVE}</MenuItem>
                                <MenuItem value={STATUS_DEVICE.INACTIVE} className={classes.inactive}>{STATUS_DEVICE.INACTIVE}</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    {apiToken.token !== '' && <>
                        <Grid item xs={6} md={6} >
                            <TextField disabled name="token" label="Token" fullWidth variant="outlined" size="small" value={apiToken.token} inputRef={tokenFieldRef} autoFocus />
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <Tooltip {...tooltipProps} onClose={handleCloseTooltip}>
                                <IconButton edge={"start"} onClick={handleCopyText}>
                                    <FilterNoneIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </>}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>
                    CANCEL
                </Button>
                {type !== 'view' && <>
                    <Button onClick={handleSubmitAPIToken} autoFocus>
                        {type?.toUpperCase()}
                    </Button></>}
            </DialogActions>
        </Dialog>
    );
}

export default APITokenDialog;