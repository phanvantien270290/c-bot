/**
 * @owner BlueSky
 * @description Define IUserNavigationAuthority interface
 * @since 1.0.0
 * @date Nov 08, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

import { IDocument, IProperty } from '../document.interface';

export interface IUserNavigationAuthorityProp extends IProperty {
    id: string;
    name: string;
    path?: string;
    hidden?: boolean;
    parentId?: string;
    users?: string[];
    private: boolean;
}

interface IUserNavigationAuthoritySchema extends IDocument {
    id: string;
    name: string;
    path?: string;
    hidden?: boolean;
    parentId?: string;
    users?: string[];
    private: boolean;
}

export interface IUserNavigationAuthority extends IUserNavigationAuthoritySchema {
    isDeleted(deleted: Boolean): any;
    isHidden(hide: Boolean): any;
}