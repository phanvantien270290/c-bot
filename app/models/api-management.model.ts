/**
 * @owner BlueSky
 * @description API Management
 * @since 1.0.0
 * @date Jan 20, 2022
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { Schema, model } from 'mongoose';
import { IAPIManagement } from "../interfaces/api-management.interface";

const name = "apimanagement";
const _schema = new Schema({
    name: { type: String, uppercase: true, unique: true, trim: true },
    uri: { type: String },
    env: { type: String },
    criteria: { type: Schema.Types.Mixed },
    method: { type: String },
    triggeredAt: { type: Number },
    obsoleted: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false }
}, {
    timestamps: true,
    collection: name
});
_schema.statics.isDeleted = function (deleted: Boolean = true) {
    return this.where({ deleted });
};
_schema.statics.isObsoleted = function (obsoleted: Boolean = true) {
    return this.where({ obsoleted });
};

export default model<IAPIManagement>(name, _schema);