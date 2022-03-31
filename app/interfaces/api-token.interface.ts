/**
 * @owner BlueSky
 * @description Define IAPIToken interface for APIToken model
 * @since 1.0.0
 * @date Mar 22, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { IDocument } from "./document.interface";

interface IAPITokenSchema extends IDocument {
    id: String,
    salt: String,
    token: String,
    app: String,
    expiredAt: Date
}

export interface IAPIToken extends IAPITokenSchema {
    isDeleted(deleted: Boolean): any;
    isObsoleted(obsoleted: Boolean): any;
    verifyToken(token: String): any
}

export interface IToken {
    id: string;
    client: string; // SPIDER2, C-AUTOM, etc.
    exp: Number; // in seconds
}