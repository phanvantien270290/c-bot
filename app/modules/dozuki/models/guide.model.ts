/**
 * @owner BlueSky
 * @description Define a data model
 * @since 1.0.0
 * @date Jan 18, 2022
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { Schema, Model } from 'mongoose';
import { IGuide } from "../interfaces/guide.interface";
import { createDBConnection, DOZUKI_CONNECTION } from '../../../config/mongo-connection.config';

const dozukiConnection = createDBConnection(DOZUKI_CONNECTION, { authSource: process.env.MGDB_DOZUKI_DATABASE_DEFAULT || 'dozuki' });
const name = "guide";
const _chema = new Schema({
    guideid: { type: Number },
    title: { type: String, trim: true },
    dataType: { type: String, trim: true },
    locale: { type: String, trim: true, default: 'en' },
    revisionid: { type: Schema.Types.Number },
    created_date: { type: Schema.Types.Number },
    modified_date: { type: Schema.Types.Number },
    published_date: { type: Schema.Types.Number },
    type: { type: String, trim: true },
    category: { type: String, trim: true },
    subject: { type: String, trim: true },
    summary: { type: String, trim: true },
    difficulty: { type: String, trim: true },
    userid: { type: Schema.Types.Number },
    username: { type: String, trim: true },
    releaseTitle: { type: String, trim: true },
    conclusion_raw: { type: String, trim: true },
    introduction_raw: { type: String, trim: true },
    time_required: { type: String, trim: true },
    time_required_min: { type: Schema.Types.Number },
    time_required_max: { type: Schema.Types.Number },
    public: { type: Schema.Types.Boolean },
    can_edit: { type: Schema.Types.Boolean },
    completed: { type: Schema.Types.Boolean },
    flags: { type: Schema.Types.Mixed },
    steps: { type: Schema.Types.Mixed }
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

export interface IGuideModel extends Model<IGuide> { }
export default dozukiConnection.model<IGuide, IGuideModel>(name, _chema);