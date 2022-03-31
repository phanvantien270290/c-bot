/**
 * @owner BlueSky
 * @description The master data which cloned from SPIDER-2
 * @since 1.0.0
 * @date Mar 22, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { Schema, model } from 'mongoose';
import { IPartner } from "../interfaces/partner.interface";

const name = "partner";
const partnerSchema = new Schema({
    custId: { type: String, uppercase: true, unique: true },
    company: { type: String },
    obsoleted: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false }
}, {
    timestamps: true,
    collection: name
});
partnerSchema.statics.isDeleted = function (deleted: Boolean = true) {
    return this.where({ deleted });
};
partnerSchema.statics.isObsoleted = function (obsoleted: Boolean = true) {
    return this.where({ obsoleted });
};

export default model<IPartner>(name, partnerSchema);