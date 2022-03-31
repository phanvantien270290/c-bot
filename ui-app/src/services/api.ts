/**
 * @owner BlueSky
 * @description
 * @since 1.0.0
 * @date May 01, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

import axios, { Method, ResponseType, AxiosRequestConfig } from 'axios';
import { persist, retrieve, remove } from '../services/session.service';

const request = (url: string, parameter: any, method: Method = "GET", responseType: ResponseType = "json"): Promise<IResponse> => {
    const methodIndex = ['PUT', 'POST', 'PATCH'].indexOf(method);
    return new Promise(resolve => {
        axios.request({
            url,
            method,
            params: methodIndex < 0 ? parameter : {},
            data: methodIndex >= 0 ? parameter : {},
            // adapter?: AxiosAdapter;
            // auth?: AxiosBasicCredentials;
            responseType,
            headers: {
                'x-access-token': retrieve()?.token
            },
            // xsrfCookieName?: string;
            // xsrfHeaderName?: string;
            // onUploadProgress?: (progressEvent: any) => void;
            // onDownloadProgress?: (progressEvent: any) => void;
        }).then(res => {
            if (res.data.auth_code === 401) {
                remove();
            }
            resolve(res.data);
        }).catch(reason => {
            resolve({ status: false, msg: reason.message });
        })
    });
}

export const getApi = (url: string, param: any) => {
    return request(url, param);
}

export const postApi = (url: string, param: any) => {
    return request(url, param, 'POST');
}

export const putApi = (url: string, param: any) => {
    return request(url, param, 'PUT');
}

export const deleteApi = (url: string, _id: string) => {
    return request(url + `/${_id}`, null, 'DELETE');
}

export const uploadFile = (url: string, formData: FormData, config?: AxiosRequestConfig) => {
    const _config: AxiosRequestConfig = {
        headers: {
            'content-type': 'multipart/form-data',
            'x-access-token': retrieve()?.token
        },
        ...config
    }
    return new Promise(resolve => {
        axios.post(url, formData, _config).then(res => {
            resolve(res.data);
        }).catch(reason => {
            resolve({ status: false, msg: reason.message });
        }).finally(() => {
            resolve({ status: false, msg: 'Something went wrong!' });
        })
    });
}

export const download = (url: string, config?: AxiosRequestConfig) => {
    const _config: AxiosRequestConfig = {
        responseType: 'arraybuffer',
        headers: {
            'x-access-token': retrieve()?.token
        },
        ...config
    }
    const msgFailed = "Download failed!";
    return new Promise(resolve => {
        axios.get(url, _config).then(res => {
            try {
                if (!res.data) { return resolve({ status: false, msg: msgFailed }); }
                let fileName = '';
                const disposition = res.headers['content-disposition'];
                if (disposition && disposition.indexOf('attachment') !== -1) {
                    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                    const matches = filenameRegex.exec(disposition);
                    if (matches != null && matches[1]) {
                        fileName = matches[1].replace(/['"]/g, '');
                    }
                }
                if (!fileName) {
                    fileName = 'download'
                };

                const type = res.headers['content-type'];
                let blob;
                if (typeof File === 'function') {
                    blob = new File([res.data], fileName, { type: type });
                } else {
                    blob = new Blob([res.data], { type })
                }

                const URL = window.URL || window.webkitURL;
                const downloadUrl = URL.createObjectURL(blob);
                const id = "download-a-" + fileName;

                const a = document.createElement("a");
                a.id = id;
                a.href = downloadUrl;
                a.download = fileName;
                a.click();

                resolve({ status: true, msg: 'Downloaded successfully!' });

                setTimeout(function () {
                    URL.revokeObjectURL(downloadUrl);
                }, 100); // cleanup
            } catch (error) {
                resolve({ status: false, msg: msgFailed });
            }
        }).catch(error => {
            resolve({ status: false, msg: msgFailed });
        })
    });
}

export const signInApi = async (username: string, password: string) => {
    const res: any = await postApi(`/api/auth/signin`, { username, password });
    if (res.status) {
        persist(res.data);
    }
    return res;
}

export const signInSSOApi = async (token: string) => {
    const res: any = await postApi(`/api/auth/sso`, { token: token });
    if (res.status) {
        persist(res.data);
    }
    return res;
}

export const signOutApi = async () => {
    const account: string = retrieve()?.accountName;
    const token: string = retrieve()?.token;
    const res: any = await postApi(`/api/auth/signout`, { account, token });
    remove();
    return res;
}