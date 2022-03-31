import React, { ReactNode, useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { signInSSOApi, signOutApi } from "../services/api";
import { remove } from "../services/session.service";
import { getProviderToken } from "../services/session.service";
import { onAuthenticate } from "../sockets/authentication.socket";
import { fetchMenu } from '../modules/nav/store/actions';
// import { useSnackbar } from "notistack";
import LinearIndeterminate from './mui-linear.component';
import { redirectToLogin } from '../utils/helper';

import { useSnackbar } from "notistack";
type IAuthContext = {
    user: IUser | null;
    signIn: () => void;
    signOut: () => void;
};
type Props = {
    children: ReactNode;
};

export const authContextDefaults: IAuthContext = {
    user: null,
    signIn: () => null,
    signOut: () => null
};
const AuthContext = React.createContext<IAuthContext>(authContextDefaults);

const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }: Props) => {
    const [user, setUser] = useState(null);
    const { enqueueSnackbar } = useSnackbar();
    const [isValidToken, setIsValidToken] = useState<boolean | null>(null);
    const dispatch = useDispatch();
    const signIn = () => {
        setUser(null);
    };
    const navigateToLogin = () => {
        remove();
        redirectToLogin();
    }
    const signOut = () => {
        navigateToLogin();
        signOutApi();
    };

    useEffect(() => {
        onAuthenticate();
        const providerToken = getProviderToken();
        signInSSOApi(providerToken).then(result => {
            if (!result.status) {
                setIsValidToken(false);
                enqueueSnackbar('Your token has expired, please re-login', { variant: 'error', onClose: navigateToLogin })
            } else {
                setIsValidToken(true);
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps

        // return () => {
        //     ioClient.close();
        // }
    }, [])
    useEffect(() => {
        isValidToken && dispatch(fetchMenu());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isValidToken])
    return (
        <AuthContext.Provider value={{ user, signIn, signOut }}>
            {isValidToken === null && <LinearIndeterminate />}
            {isValidToken === true && children}
        </AuthContext.Provider>
    )
}

export { useAuth };