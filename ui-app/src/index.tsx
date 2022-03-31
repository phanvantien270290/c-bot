/**
 * @owner BlueSky
 * @description Root app
 * @since 1.0.0
 * @date May 01, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { SnackbarProvider } from 'notistack';
import './index.css';
import App from './modules/app/components/app.component';
import * as serviceWorker from './serviceWorker';

import AppReducer from './store/reducers';
import AppSaga from './store/sagas';
import CustomThemeProvider from './shared/theme/custom-provider.theme';
import httpService from './services/interceptors.service';
import { AuthProvider } from './components/auth-provider.component';

const sagaMiddleware = createSagaMiddleware();
const appStore = createStore(
    AppReducer,
    applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(AppSaga);

httpService.setupInterceptors(appStore);




ReactDOM.render(
    <Provider store={appStore} >
        <BrowserRouter >
            <CustomThemeProvider  >
                <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
                    <AuthProvider>
                        <App />
                    </AuthProvider>
                </SnackbarProvider>
            </CustomThemeProvider >
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
