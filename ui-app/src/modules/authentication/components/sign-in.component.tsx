import React, { useRef, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import { InputAdornment, IconButton, Tooltip } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="#">
                C-Bot
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn(props: any) {
    const { signIn } = props;
    const { enqueueSnackbar } = useSnackbar();
    const userRef = useRef<HTMLInputElement>();
    const pwdRef = useRef<HTMLInputElement>();

    const classes = useStyles();
    const [state, setState] = useState({
        userName: '',
        password: '',
        remember: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const handleToggleShowPassword = () => setShowPassword(!showPassword);

    const onInputChange = (e: any) => {
        if (!e) return;
        let value = e.target.value;//.replace(/\s+/g, '');
        if (e.target.type === 'checkbox') {
            value = e.target.checked;
        }

        setState({ ...state, [e.target.name]: value });
    };

    const onSubmit = (event: any) => {
        event.preventDefault();
        if (state.userName && state.password) {
            // return signIn(state);
        }
        if (!state.userName) {
            userRef.current?.focus();
        } else {
            pwdRef.current?.focus();
        }
        enqueueSnackbar('Please enter username and password fields', { variant: 'error' });
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined" margin="normal" required
                        fullWidth id="email" label="Username"
                        name="userName" autoFocus
                        inputRef={userRef}
                        onChange={onInputChange}
                    />
                    <TextField
                        variant="outlined" margin="normal" required
                        fullWidth id="password" label="Password" type={showPassword ? "text" : "password"}
                        name="password" autoComplete="current-password"
                        inputRef={pwdRef}
                        InputProps={{ // <-- This is where the toggle button is added.
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Tooltip
                                        title={showPassword ? 'Hide password' : 'Show password'}
                                    >
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleToggleShowPassword}
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </Tooltip>

                                </InputAdornment>
                            )
                        }}
                        onChange={onInputChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        onClick={onSubmit}
                        className={classes.submit}
                    >
                        Sign In
                    </Button>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </Container>
    );
}