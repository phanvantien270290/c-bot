import React, { useEffect } from 'react';
import { Controller, } from 'react-hook-form';
import { useSnackbar } from "notistack";
import { Button, Grid, Icon, TextField } from '@mui/material';
import useStylesSearch from './search.style';
import DatePicker from '@mui/lab/DatePicker';
import { convertParamsToRequest, createQueryString } from "../../utils/helper";
import { MenuItemProps } from '../action-menu/action-menu.component';
import { exportExcel as exportExcelFunc } from '../../store/shared/services';
export interface IFormSearchAdvance {
    type: "date" | "checkbox" | "select",
    [x: string]: any,
    label: string,
    name: string,
    width?: number | string,
    // for date type
    minDate?: Date,
    maxDate?: Date,
    hasDateRange?: boolean,
    // for select type
    getOptionLabel?: (options: any) => any,
    getOptionSelected?: (option: any, value: any) => boolean,
    multiple?: boolean,
    listData?: Array<any>,

}
export interface IFormSearchProps {
    onSearch?: (params?: ISearchParams, resetPage?: boolean) => void;
    placeHolder?: string,
    useForm: any,
    formSearchAdvance?: IFormSearchAdvance[];
    optionsHis?: {
        actions: {
            exportExcel?: boolean
        },
        module: string,
        custId: string,
        type?: string | null
    },
    isTimeoutShouldBeCleared?: boolean
}

let timeout: NodeJS.Timeout | null = null;
const FormSearchComponent: React.FC<IFormSearchProps> = (props) => {
    const { onSearch,
        placeHolder,
        formSearchAdvance,
        useForm,
        optionsHis,
        isTimeoutShouldBeCleared
    } = props;
    const classes = useStylesSearch();
    const { enqueueSnackbar } = useSnackbar();
    // const anchorRef = React.useRef<HTMLDivElement>(null);
    const { control, getValues, setValue, errors, setError, clearErrors } = useForm;

    const handleOnchangeSearchText = (event: any) => {
        clearTimeoutAutoSearch();
        const _value = event.target.value;
        timeout = setTimeout(() => {
            excuteOnSearch({ searchText: _value })
        }, 1000)

    }
    const clearTimeoutAutoSearch = () => {
        if (timeout) { clearTimeout(timeout) }
    }
    const handleOnKeyPress = (event: any) => {

        if (event.which === 13) {
            event.preventDefault();
            clearTimeoutAutoSearch();
            excuteOnSearch();
        }
    }
    const handleChangeDate = (name: string, date: Date | null) => {
        setValue(name, date);
    }
    const excuteOnSearch = (configParams?: ISearchParams) => {
        if (!Object.keys(errors).length) {
            let params = getParams(configParams);
            onSearch && onSearch(params);
        }

    }
    const getParams = (configParams?: ISearchParams) => {
        return convertParamsToRequest({ ...getValues(), options: { ...getValues().options, page: 0 }, ...configParams });
    }
    const clearSearchText = () => {
        clearTimeoutAutoSearch();
        setValue('searchText', '');
        excuteOnSearch({ searchText: '' });
    }

    const setErrorDate = (nameDate: string, error: any, date: any) => {
        if (!error && errors[nameDate]) {
            clearErrors(nameDate);
        }
        if (error && errors[nameDate] === undefined) {
            setError(nameDate, { type: "required", message: "date error" });
        }
    }
    const setRangeDate = (valDate: string): Date | null => {
        return getValues(valDate);
    }
    const drawDateFieldControl = (item: IFormSearchAdvance, i: string): any => {
        let fieldControl;
        const key = `${item.name}-${item.label}-${i}`;
        const width = item.width || 200;
        if (item.hasDateRange) {
            const nameDateFrom = `searchFields[${item.name}From]`;
            const nameDateTo = `searchFields[${item.name}To]`;
            fieldControl = <Grid container spacing={2} style={{ display: "flex" }}>
                <Grid xs={6} item style={{ position: "relative", width }}>
                    <Controller
                        name={nameDateFrom}
                        control={control} defaultValue={null}
                        key={`${key}-from`}
                        render={({ field: { onChange, onBlur, value, ...props } }) =>
                            <DatePicker
                                {...props}
                                inputFormat='MM/dd/yyyy'
                                onError={(err, date) => setErrorDate(`${item.name}From`, err, date)}

                                renderInput={props => <TextField label={`${item.label} From`} placeholder="MM/dd/yyyy" helperText="Something" />} onChange={onChange} value={value} />
                        }
                    />
                </Grid>
                <Grid item xs={6} style={{ position: "relative", width }}>
                    <Controller
                        name={nameDateTo}
                        control={control} defaultValue={null}
                        key={`${key}-to`}
                        render={() => (
                            <>
                                {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        onChange={onChange}
                                        onError={(err, date) => setErrorDate(`${item.name}To`, err, date)}
                                        {...props} value={value} placeholder="MM/dd/yyyy"
                                        autoOk disableToolbar autoComplete="off"
                                        variant="inline" fullWidth name={nameDateTo} margin="dense"
                                        maxDate={item.maxDate} minDate={setRangeDate(nameDateFrom) || item.minDate} format="MM/dd/yyyy"
                                        label={`${item.label} To`} inputVariant="outlined" onFocus={undefined} onBlur={undefined}
                                        InputProps={{ style: { paddingRight: 0 } }}
                                        KeyboardButtonProps={{ 'aria-label': 'change date' }} />
                                </MuiPickersUtilsProvider>
                                {value && <IconButton onClick={() => onChange(null)}
                                    className={classes.closeDateButton} aria-label="Clear date">
                                    <CloseOutlinedIcon />
                                </IconButton>} */}
                            </>
                        )}
                    />

                </Grid>
            </Grid>
        } else {
            const nameDate = `searchFields[${item.name}]`;
            fieldControl = <div style={{ position: "relative", width: "100%" }}>
                {/* <Controller
                    name={nameDate}
                    control={control}
                    defaultValue={null}
                    render={({ value, ...props }) => ( */}
                {/* <> */}
                {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    {...props} value={value} helperText="" autoOk disableToolbar autoComplete="off"
                                    variant="inline" fullWidth name={nameDate} margin="dense"
                                    maxDate={item.maxDate} minDate={item.minDate} format="MM/dd/yyyy"
                                    label={item.label} inputVariant="outlined" onFocus={undefined} onBlur={undefined}
                                    InputProps={{ style: { paddingRight: 0 } }} placeholder="MM/dd/yyyy"
                                    KeyboardButtonProps={{ 'aria-label': 'change date' }} />
                            </MuiPickersUtilsProvider>
                            {value
                                && <IconButton onClick={() => handleChangeDate(nameDate, null)} className={classes.closeDateButton} aria-label="Clear date">
                                    <CloseOutlinedIcon />
                                </IconButton>} */}
                {/* </>)} /> */}
            </div>
        }
        return fieldControl;
    }
    const drawSelectFieldControl = (item: IFormSearchAdvance, i: string): any => {
        const width = item.width || 200;
        const fieldControl = <Grid item style={{ minWidth: width }} />
        return fieldControl;
    }

    const drawFormSearchAdvance = (): JSX.Element[] => {
        const _formControl = [];
        for (let i in formSearchAdvance) {
            let inputForm;
            const item = formSearchAdvance[+i];
            const key = `${item.name}-${item.label}-${i}`;
            switch (item.type) {
                case 'date':
                    inputForm = drawDateFieldControl(item, i);
                    break;
                case 'select':
                    inputForm = drawSelectFieldControl(item, i);
                    break;
                default:
                    break;
            }
            _formControl.push(<Grid item key={key}>{inputForm}</Grid>);
        }
        if (_formControl.length) {
            _formControl.push(<Grid item key={'btn-history-search'}>
                <Button
                    onClick={() => excuteOnSearch()}
                    className={classes.marginDense}
                    variant="contained" color="secondary"
                    startIcon={<Icon>search</Icon>}
                    id="btn-history-search">Search
                </Button>
            </Grid>)
        }
        return _formControl;
    }
    const drawActionHis = (): MenuItemProps<any>[] => {
        if (!optionsHis || !Object.keys(optionsHis).length) {
            return [];
        }
        const _actionHis: MenuItemProps<any>[] = [];
        const { exportExcel } = optionsHis.actions;
        if (exportExcel) {
            _actionHis.push({
                title: 'Export Excel',
                icon: 'import_export',
                id: 'export_excel_id',
                onClick: () => {
                    const queryObj = convertParamsToRequest({
                        module: optionsHis.module, ...getParams(),
                        searchFields: {
                            ...getParams().searchFields,
                            custId: optionsHis.custId,
                            type: optionsHis.type || null
                        }
                    });
                    const queryString = createQueryString(queryObj);
                    exportExcelFunc(queryString).then((resp: any) => {
                        if (resp.status) {
                            enqueueSnackbar(resp.msg, { variant: "success" })
                        } else {
                            enqueueSnackbar(resp.msg, { variant: "error" })
                        }
                    });
                }
            })
        }

        return _actionHis;
    }
    useEffect(() => {
        if (isTimeoutShouldBeCleared) {
            clearTimeoutAutoSearch();
        }
    });
    return (
        <React.Fragment>
            <form className={classes.root} >
                <Grid container className={classes.flexGrow1} spacing={2}>
                    {/* <Grid item style={{ width: 500, display: "flex" }} xs={12}>
                        <Controller
                            render={({ onChange, value, ...props }) => (
                                <ITextField
                                    {...props}
                                    value={value}
                                    className={`${classes.inputSearch} ${classes.rootItem}`}
                                    placeholder={placeHolder}
                                    fullWidth
                                    onChange={(event) => { handleOnchangeSearchText(event); onChange(event) }}
                                    onKeyPress={handleOnKeyPress}
                                    autoComplete="off"
                                    name="searchText"

                                    InputProps={{
                                        style: { paddingRight: 40 },
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon className={classes.colorAction} />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    className={clsx(classes.clearIndicator, {
                                                        [classes.clearIndicatorDirty]: value && value.length > 0
                                                    })}
                                                    size="small" aria-label="Clear text search"
                                                    onClick={clearSearchText} >
                                                    <CloseIcon fontSize="small" />
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            )}
                            name="searchText"
                            control={control}
                            defaultValue=""
                        />
                        {optionsHis && Object.keys(optionsHis.actions).length && <ActionMenuComponent rightAction={drawActionHis()} style={{ margin: 'auto', height: 40 }} />}
                    </Grid> */}
                    {drawFormSearchAdvance()}
                </Grid>
            </form>

        </React.Fragment>
    )

}
export default FormSearchComponent;