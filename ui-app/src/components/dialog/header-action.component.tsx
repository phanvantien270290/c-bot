/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date Oct 23, 2020
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 */

import React, { useEffect } from 'react';
import { Theme } from '@mui/material/styles';

import { makeStyles, createStyles } from '@mui/styles';
import { Button, Typography } from '@mui/material';
import { AddOutlined } from '@mui/icons-material';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *:not(:last-child)': {
                marginRight: theme.spacing(1),
            },
        },
        header: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        buttonAction: {
            textAlign: 'right',
            position: 'absolute',
            right: 10,
            bottom: 8,
        }
    }),
);

export interface IHeaderDialogProps {
    title: string,
    typeAction: IActionTypes,
    onHandleAction: (type: IActionTypes) => void
}

export const HeaderDialog: React.FC<IHeaderDialogProps> = (props) => {
    const { title, typeAction, onHandleAction } = props;
    const classes = useStyles();
    const handleOnTriggerCreate = () => {
        onHandleAction('create')
    }

    const handleOnTriggerEdit = () => {
        onHandleAction('edit')
    }
    const showTitle = (): string => {
        let _title = title;
        if (typeAction === 'edit') _title = `Edit ${title}`;
        if (typeAction === 'create') _title = `Add ${title}`;
        return _title;
    }
    useEffect(() => {

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [typeAction])
    return (
        <div className={classes.header}>
            <div><Typography variant="h2">{showTitle()}</Typography> </div>
            <div className={classes.root}>
                {typeAction === 'view' &&
                    <Button variant="outlined" onClick={handleOnTriggerEdit} color="primary" startIcon={<AddOutlined />}>
                        EDIT
                    </Button>}
                {typeAction !== 'create' &&
                    <Button variant="outlined" onClick={handleOnTriggerCreate} color="primary" startIcon={<AddOutlined />}>
                        ADD NEW
                    </Button>}
            </div>
        </div>
    );
}