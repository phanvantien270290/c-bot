/**
 * @owner BlueSky
 * @description Define IUserInterface interface for IUserInterface model.
 * @since 1.0.0
 * @date Nov 09, 2020
 * @contributors
 *      Phat Le <phat.le@ccintegration.com>
 */
import { IDocument } from "./document.interface";

interface IUserSchema extends IDocument {
    _id: string,
    name: string,
    email: string
}

export interface IUser extends IUserSchema {
    isDeleted(deleted: Boolean): any;
    isObsoleted(obsoleted: Boolean): any;
}