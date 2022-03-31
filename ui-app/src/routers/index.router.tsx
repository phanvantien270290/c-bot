
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import AuthRoutes from './auth.routes';
import CustomDrawer from '../modules/nav/containers/custom-drawer.container';
import { useSelector } from 'react-redux';
import { RouteComponent, publicRoutes } from './routes'

const MainRoutes = ({ ...props }: any) => {
    const { data } = useSelector(({ nav }: IState) => nav)
    return (
        <Routes>
            <Route path="/" element={<AuthRoutes />}>
                <Route path="/" element={<CustomDrawer />}>
                    {
                        data.length && (
                            <>
                                {/* {privateRoutes.map((item, index) => {
                                const RouteComp = RouteComponent(item.id);
                                return item.active && RouteComp && <Route key={`private-route-${index}`} path={item.path} element={<RouteComp />} />
                            }

                            )} */}
                                {
                                    data.map((item, index) => {
                                        const RouteComp = RouteComponent(item.id);
                                        return item.path && RouteComp && <Route key={`private-db-route-${index}`} path={item.path} element={< RouteComp />} />
                                    }
                                    )}
                            </>
                        )}
                </Route>
            </Route>
            {
                publicRoutes.map((item, index) => {
                    const RouteComp = RouteComponent(item.id);
                    return item.active && RouteComp && <Route key={`public-route-${index}`} path={item.path} element={< RouteComp />} />
                })
            }
        </Routes >
    )
}
export default MainRoutes
