/**
 * @owner BlueSky
 * @description Define IItemMaster interface for ItemMaster model
 * @since 1.0.0
 * @date Mar 22, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { IDocument, IProperty } from "./document.interface";

export interface IItemMasterProp extends IProperty {
    [x: string]: any;
    custId?: string,
    partNumber?: string,
    custPartNumber?: string,
    manfPartNumber?: string,
    description?: string,
    version?: string
}
interface IItemMasterSchema extends IDocument {
    custId: String,
    partNumber: String,
    custPartNumber: String,
    manfPartNumber: String,
    description: String,
    version: String
}

export interface IItemMaster extends IItemMasterSchema {
    isDeleted(deleted: Boolean): any;
    isObsoleted(obsoleted: Boolean): any;
}