import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
export default makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            zIndex: 1
        },
        flexGrow1: {
            // flexGrow: 1,
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1)
        },
        inputSearch: {
            maxWidth: 500
        },
        colorAction: {
            color: theme.palette.text.disabled
        },
        appBar: {
            position: 'relative',
        },
        title: {
            marginLeft: theme.spacing(2),
            flex: 1,
        },
        closeDateButton: {
            position: "absolute",
            left: "calc(100% - 100px)",
            top: 12
        },
        marginDense: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1)
        },
        rootItem: {
            backgroundColor: "#f1f3f4",
            "&:hover": {
                backgroundColor: "#fff"
            },
            "&:hover $clearIndicatorDirty, & .Mui-focused $clearIndicatorDirty": {
                visibility: "visible",

            }
        },
        clearIndicatorDirty: {},
        clearIndicator: {
            visibility: "hidden"
        }
    }),
);