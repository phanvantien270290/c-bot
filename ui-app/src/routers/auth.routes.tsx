import React from 'react';
import { isLogged } from '../services/session.service';
import { Navigate, Outlet, useLocation } from 'react-router-dom'


const AuthRoutes = (props: any) => {
    const auth = isLogged();
    const location = useLocation();
    return auth ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
}

export default AuthRoutes;