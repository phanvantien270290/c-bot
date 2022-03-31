/**
 * @owner BlueSky
 * @description Define ICountry interface for Country model
 * @since 1.0.0
 * @date Mar 22, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { IDocument } from "./document.interface";

interface ICountrySchema extends IDocument {
    code: String,
    name: String,
    frequency: Number
}

export interface ICountry extends ICountrySchema {
    isDeleted(deleted: Boolean): any;
    isObsoleted(obsoleted: Boolean): any;
}