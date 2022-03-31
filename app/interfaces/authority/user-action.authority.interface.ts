/**
 * @owner BlueSky
 * @description Define IUserActionAuthority interface
 * @since 1.0.0
 * @date Nov 08, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

import { IDocument, IProperty } from '../document.interface';

export interface IUserActionAuthorityProp extends IProperty {
    id: string;
    name: string;
    api?: string;
    parentId?: string;
}

interface IUserActionAuthoritySchema extends IDocument {
    id: String;
    name: String;
    api?: String;
    parentId?: string;
}

export interface IUserActionAuthority extends IUserActionAuthoritySchema {
    isDeleted(deleted: Boolean): any;
    isObsoleted(obsoleted: Boolean): any;
}