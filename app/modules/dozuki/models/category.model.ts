/**
 * @owner BlueSky
 * @description Define a data model
 * @since 1.0.0
 * @date Jan 12, 2022
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { Schema, Model } from 'mongoose';
import { ICategory } from "../interfaces/category.interface";
import { createDBConnection, DOZUKI_CONNECTION } from '../../../config/mongo-connection.config';

const dozukiConnection = createDBConnection(DOZUKI_CONNECTION, { authSource: process.env.MGDB_DOZUKI_DATABASE_DEFAULT || 'dozuki' });
const name = "category";
const _chema = new Schema({
    wikiid: { type: Number, required: true },
    wiki_title: { type: String, trim: true, required: true },
    display_title: { type: String, trim: true },
    locale: { type: String, trim: true, default: 'en' },
    topic_info: { type: Schema.Types.Mixed },
    image: { type: Schema.Types.Mixed },
    description: { type: String, trim: true },
    flags: { type: Schema.Types.Mixed },
    solutions: { type: Schema.Types.Mixed },
    parts: { type: Schema.Types.Mixed },
    tools: { type: Schema.Types.Mixed },
    ancestors: { type: Schema.Types.Array },
    children: { type: Schema.Types.Mixed },
    guides: { type: Schema.Types.Mixed },
    documents: { type: Schema.Types.Mixed },
    contents_raw: { type: String, trim: true },
    title: { type: String, trim: true },
    contents: { type: String, trim: true },
    category_info: { type: String, trim: true },
    lastUpdate: { type: Schema.Types.ObjectId }
}, {
    timestamps: true,
    collection: name
});
_chema.statics.isDeleted = function (deleted: Boolean = true) {
    return this.where({ deleted });
};
_chema.statics.isObsoleted = function (obsoleted: Boolean = true) {
    return this.where({ obsoleted });
};

export interface ICategoryModel extends Model<ICategory> { }
export default dozukiConnection.model<ICategory, ICategoryModel>(name, _chema);