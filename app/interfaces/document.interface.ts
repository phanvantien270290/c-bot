/**
 * @owner BlueSky
 * @description Define Document interface for others
 * @since 1.0.0
 * @date Mar 22, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { Document, Schema } from "mongoose";

export interface IDocument extends Document {
    deleted: Boolean,
    obsoleted: Boolean,
    createdAt: Date,
    updatedAt: Date,
    createdBy: String,
    updatedBy: String,
    lastUpdate: Schema.Types.ObjectId; // It's used to sort data
}

export interface IProperty {
    deleted?: boolean;
    obsoleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: string;
    updatedBy?: string;
    lastUpdate?: any;
}
export interface IPropertyMethod {
    isDeleted(deleted: Boolean): any;
    isObsoleted(obsoleted: Boolean): any;
}