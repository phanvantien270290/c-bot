import { makeStyles } from "@mui/styles";
import { Theme } from '@mui/material/styles';
const navigationItemStyle = makeStyles((theme: Theme) => ({
    root: {
        height: 264,
        flexGrow: 1,
        maxWidth: 400,
        textAlign: 'left'
    },
    group: {
        marginLeft: 7,
        paddingLeft: 18,
        borderLeft: `1px dashed`,
    },
    fontBold: {
        fontWeight: 700
    },
    fontNormal: {
        fontWeight: 400
    }
}));

export { navigationItemStyle };
