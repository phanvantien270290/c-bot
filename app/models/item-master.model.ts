/**
 * @owner BlueSky
 * @description This is one of mastered data which stored the Item Master cloned from SPIDER-2
 * @since 1.0.0
 * @date Mar 22, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { StringHelper } from '../utils/helper.util';
import { Schema, model, Model } from 'mongoose';
import { IItemMaster } from "../interfaces/item-master.interface";

const itemMasterSchema = new Schema<IItemMaster>({
    partNumber: { type: String, unique: false, trim: true, uppercase: true },
    custPartNumber: { type: String, trim: true },
    manfPartNumber: { type: String, trim: true },
    description: { type: String, trim: true },
    obsoleted: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false },
    custId: { type: String, ref: 'partner', trim: true, uppercase: true },
    version: { type: String, trim: true, uppercase: true },
    notes: { type: String, trim: true }
}, {
    timestamps: true,
    collection: 'itemmaster'
});
itemMasterSchema.statics.isDeleted = function (deleted: Boolean = true) {
    return this.where({ deleted });
};
itemMasterSchema.statics.isObsoleted = function (obsoleted: Boolean = true) {
    return this.where({ obsoleted });
};

itemMasterSchema.pre<IItemMaster>('save', function (next) {
    this.collection.countDocuments({
        partNumber: this.partNumber,
        custId: { $in: [null, '', this.custId] },
        version: this.version,
        deleted: { $ne: true }
    }).then(value => {
        if (value > 0) {
            next(new Error(StringHelper.sprintf(`The PartNumber [%s] and Version [%s] are duplicated`, this.partNumber.toString(), this.version.toString())));
        } else {
            next();
        }
    });
});

export interface IItemMasterModel extends Model<IItemMaster> { }
export default model<IItemMaster, IItemMasterModel>('itemmaster', itemMasterSchema);