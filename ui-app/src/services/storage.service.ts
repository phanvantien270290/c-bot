/**
 * @owner BlueSky
 * @description Define a storage on Client
 * @since 1.0.0
 * @date May 08, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

export const loadJson = (name: string) => {
    try {
        const serializedState = localStorage.getItem(name);
        if (!serializedState) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (error) {
        return undefined;
    }
}

export const saveJson = (name: string, json: any) => {
    try {
        const serializedState = JSON.stringify(json, null, 4);
        localStorage.setItem(name, serializedState);
        return true;
    } catch (error) {
        return false;
    }
}

export const clearStorage = (name: string = '') => {
    if (name) {
        localStorage.removeItem(name);
    } else {
        localStorage.clear();
    }
}

export const getValue = (name: string) => {
    return localStorage.getItem(name);
}

export const setValue = (name: string, value: string) => {
    localStorage.setItem(name, value);
}