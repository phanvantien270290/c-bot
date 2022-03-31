import axios from 'axios';
import { confirmUnauthenticated } from '../modules/nav/store/actions';
import { retrieve, remove as clearProfileStorage } from './session.service';


const httpService = {
    setupInterceptors: (store: any) => {
        axios.interceptors.response.use(reponse => {
            const profile = retrieve();
            if (window.location.pathname !== '/login' && (!profile || (reponse.data && reponse.data.auth_code === 401))) {
                clearProfileStorage();
                store.dispatch(confirmUnauthenticated(false));
            }
            return reponse;
        }, undefined)
    }
}
export default httpService