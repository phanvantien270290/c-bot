/**
 * @owner BlueSky
 * @description Store printers' data
 * @since 1.0.0
 * @date Mar 22, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { Schema, model, Model } from 'mongoose';
import { IUserNavigationAuthority } from "../interfaces/authority/user-navigation.authority.interface";

const nameCollection = 'usernavigation';
const userNavigationSchema = new Schema({
    id: { type: String, uppercase: true, trim: true, unique: true },
    name: { type: String, trim: true },
    path: { type: String, default: null },
    hidden: { type: Boolean, default: false },
    parentId: { type: String, default: null },
    users: { type: Array, default: [] },
    private: { type: Boolean, default: false },
    obsoleted: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false }
}, {
    timestamps: true,
    collection: nameCollection
});

userNavigationSchema.statics.isDeleted = function (deleted: Boolean = true) {
    return this.where({ deleted });
};
userNavigationSchema.statics.isObsoleted = function (obsoleted: Boolean = true) {
    return this.where({ obsoleted });
};

export interface IUserNavigationModel extends Model<IUserNavigationAuthority> { }

export default model<IUserNavigationAuthority, IUserNavigationModel>(nameCollection, userNavigationSchema);