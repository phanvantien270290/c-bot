/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date June 16, 2020
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 */

import React from 'react';
import { makeStyles } from '@mui/styles';
import { createStyles } from '@mui/styles';
import { Typography } from '@mui/material';
import { Theme } from '@mui/system/createTheme';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 100,
            borderRadius: 5,
            textAlign: 'center'
        },
        statusForm: {
            cursor: "default",
            height: 20,
            display: "inline-flex",
            padding: "4px 8px",
            flexGrow: 0,
            fontSize: "0.75rem",
            minWidth: 20,
            alignItems: "center",
            flexShrink: 0,
            fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"',
            fontWeight: 500,
            whiteSpace: "nowrap",
            borderRadius: 2,
            letterSpacing: "0.5px",
            textTransform: "uppercase",
            justifyContent: "center",
            backgroundColor: "#bfb5b533"
        },
        complete: {
            color: "#81d742"
        },
        cancelled: {
            color: "#dd3333"
        },
        inprogress: {
            color: "#ff9800"
        },
        new: {
            color: "#1e73be"
        },
        hold: {
            color: "#dd9933"
        },
        awaiting: {
            color: "#0074a2"
        },
        disabled: {
            color: "#a8a8a8"
        }
    }),
);
interface IStatus {
    status: "COMPLETE" | "CANCELLED" | "NEW" | "HOLD" | "AWAITING" | "INPROGRESS" | string
    title: string;
}
const StatusComponent: React.FC<IStatus> = ({ status, title, ...props }) => {
    const classes = useStyles();
    const getStyle = () => {
        switch (status.toUpperCase()) {
            case "COMPLETE":
                return classes.complete
            case "CANCELLED":
                return classes.cancelled
            case "INPROGRESS":
                return classes.inprogress
            case "HOLD":
                return classes.hold
            case "NEW":
                return classes.new
            case "AWAITING":
                return classes.awaiting
            default:
                break;
        }

    }
    return (
        <Typography variant='inherit' className={`${getStyle()} ${classes.statusForm} ${classes.root}`} component="div">
            {title}
        </Typography>

        // <Typography component="div" default className={` ${classes.root}`} children={status} />

    )
}
export default React.memo(StatusComponent, (prevProps, nextProps) => prevProps.status === nextProps.status);