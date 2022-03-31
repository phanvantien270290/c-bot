/**
 * @owner BlueSky
 * @description Define a data model
 * @since 1.0.0
 * @date Jan 12, 2022
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { Schema, Model } from 'mongoose';
import { IWorklog } from "../interfaces/worklog.interface";
import { createDBConnection, DOZUKI_CONNECTION } from '../../../config/mongo-connection.config';

const dozukiConnection = createDBConnection(DOZUKI_CONNECTION, { authSource: process.env.MGDB_DOZUKI_DATABASE_DEFAULT || 'dozuki' });
const name = "worklog";
const _chema = new Schema({
    entryid: { type: Number, required: true },
    guideid: { type: Number, required: true },
    workorderid: { type: String, trim: true },
    userid: { type: Number },
    starttime: { type: Number },
    endtime: { type: Number },
    timingid: { type: Number },
    max_form_revisionid: { type: Number },
    guide_revisionid: { type: Number },
    duration: { type: Number },
    active_duration: { type: Number },
    cancelled: { type: Number },
    handoffid: { type: Number },
    work_data: { type: Schema.Types.Mixed },
    signoffs: { type: Schema.Types.Mixed },
    status: { type: String, trim: true },
    workorderid_refs: { type: Schema.Types.Mixed }
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

export interface IWorklogModel extends Model<IWorklog> { }
export default dozukiConnection.model<IWorklog, IWorklogModel>(name, _chema);