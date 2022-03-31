/**
 * @owner BlueSky
 * @description Define IUserActionAuthority interface
 * @since 1.0.0
 * @date Nov 08, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

import { IDocument, IProperty } from '../document.interface';
import { IUserActionAuthorityProp } from './user-action.authority.interface';
import { IUserNavigationAuthorityProp } from './user-navigation.authority.interface';

export interface IAuthorityProp extends IProperty {
    userId: string;
    userNavigation: [IUserNavigationAuthorityProp];
    userAction: [IUserActionAuthorityProp];
}

interface IAuthoritySchema extends IDocument {
    userId: string;
    userNavigation: [IUserNavigationAuthorityProp];
    userAction: [IUserActionAuthorityProp];
}

export interface IAuthority extends IAuthoritySchema {
    isDeleted(deleted: Boolean): any;
    isObsoleted(obsoleted: Boolean): any;
}