/**
 * @owner BlueSky
 * @description 
 * @since 1.0.0
 * @date Nov 12, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { Schema, model, Model } from 'mongoose';
import { ICountry } from "../interfaces/country.interface";

const _schema = new Schema({
    code: { type: String },
    name: { type: String },
    frequency: { type: Number },
    obsoleted: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false }
}, {
    timestamps: true,
    collection: 'country'
});
_schema.statics.isDeleted = function (deleted: Boolean = true) {
    return this.where({ deleted });
};
_schema.statics.isObsoleted = function (obsoleted: Boolean = true) {
    return this.where({ obsoleted });
};

export interface ICountryModel extends Model<ICountry> { }

export default model<ICountry, ICountryModel>("country", _schema)