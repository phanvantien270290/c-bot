/**
 * @owner BlueSky
 * @description Define IAPIManagement interface for model
 * @since 1.0.0
 * @date Jan 20, 2022
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { IDocument, IProperty } from "./document.interface";

export interface IAPIManagementProp extends IProperty {
    name?: string
    uri?: string
    env?: string
    criteria?: any
    method?: string
    triggeredAt?: number
}

export interface IAPIManagementSchema extends IDocument {
    name?: string
    uri?: string
    env?: string
    criteria?: any
    method?: string
    triggeredAt?: number
}

export interface IAPIManagement extends IAPIManagementSchema {
    isDeleted(deleted: Boolean): any;
    isObsoleted(obsoleted: Boolean): any;
}