/**
 * @owner BlueSky
 * @description Define a data model
 * @since 1.0.0
 * @date Jan 12, 2022
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { Schema, Model } from 'mongoose';
import { IDozukiUser } from "../interfaces/user.interface";
import { createDBConnection, DOZUKI_CONNECTION } from '../../../config/mongo-connection.config';

const dozukiConnection = createDBConnection(DOZUKI_CONNECTION, { authSource: process.env.MGDB_DOZUKI_DATABASE_DEFAULT || 'dozuki' });
const name = "user";
const _chema = new Schema({
    userid: { type: Number, required: true },
    username: { type: String, trim: true },
    unique_username: { type: String, trim: true },
    join_date: { type: Number },
    image: { type: Schema.Types.Mixed },
    reputation: { type: Number },
    url: { type: String },
    teams: { type: Schema.Types.Mixed },
    privileges: { type: Schema.Types.Mixed },
    tools: { type: Schema.Types.Mixed }
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

export interface IDozukiUserModel extends Model<IDozukiUser> { }
export default dozukiConnection.model<IDozukiUser, IDozukiUserModel>(name, _chema);