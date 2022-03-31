/**
 * @owner BlueSky
 * @description The authentication actions
 * @since 1.0.0
 * @date May 05, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
export const AUTHENTICATION_SIGN_IN = 'AUTHENTICATION::SIGN_IN';
export const AUTHENTICATION_SIGN_UP = 'AUTHENTICATION::SIGN_UP';
export const AUTHENTICATION_SIGN_OUT = 'AUTHENTICATION::SIGN_OUT';
export const AUTHENTICATION_AUTHENTICATED = 'AUTHENTICATION::AUTHENTICATED';
export const AUTHENTICATION_UNAUTHENTICATED = 'AUTHENTICATION::UNAUTHENTICATED';

export const signIn = (payload: any) => {
    return {
        type: AUTHENTICATION_SIGN_IN,
        payload
    }
}

export const signUp = (payload: any) => {
    return {
        type: AUTHENTICATION_SIGN_OUT,
        payload
    }
}

export const signOut = (payload: any) => {
    return {
        type: AUTHENTICATION_SIGN_IN,
        payload
    }
}

export const beAuthenticated = (payload: any) => {
    return {
        type: AUTHENTICATION_AUTHENTICATED,
        payload
    }
}

export const beExpired = (payload: any) => {
    return {
        type: AUTHENTICATION_UNAUTHENTICATED,
        payload
    }
}