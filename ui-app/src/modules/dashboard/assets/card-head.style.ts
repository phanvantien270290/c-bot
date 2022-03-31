import { Theme } from "@mui/material";
import { red } from '@mui/material/colors';
import { createStyles, makeStyles } from '@mui/styles';

const useStyleCardHead = makeStyles((theme: Theme) =>
    createStyles({
        boxPerCent: {
            paddingTop: theme.spacing(1),
            display: 'flex',
            alignItems: 'center'
        },
        colorRed: {
            color: red[900],
        }
    }),
);

export { useStyleCardHead }