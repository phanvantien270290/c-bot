/**
 * @owner BlueSky
 * @description Define interface for the User model
 * @since 1.0.0
 * @date Jan 12, 2022
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { IDocument, IProperty } from "../../../interfaces/document.interface";

export interface IDozukiUserProp extends IProperty {
    userid: number,
    username: string,
    unique_username?: string,
    join_date?: number,
    image?: any,
    reputation?: number,
    url?: string,
    teams?: Array<number>,
    privileges?: Array<string>,
    [x: string]: any
}

interface IDozukiUserSchema extends IDocument {
    userid: number,
    username: string,
    unique_username?: string,
    join_date?: number,
    image?: any,
    reputation?: number,
    url?: string,
    teams?: Array<number>,
    privileges?: Array<string>,
    [x: string]: any
}

export interface IDozukiUser extends IDozukiUserSchema {
    isDeleted(deleted: Boolean): any;
    isObsoleted(obsoleted: Boolean): any;
}