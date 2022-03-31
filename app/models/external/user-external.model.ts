/**
 * @owner BlueSky
 * @description This is user data from CAUTHEN
 * @since 1.0.0
 * @date Nov 09, 2020
 * @contributors
 *      Phat Le <phat.le@ccintegration.com>
 */
import { Schema } from 'mongoose';
import { IUser } from "../../interfaces/user.interface";
import { createDBConnection, CAUTHEN_CONNECTION } from '../../config/mongo-connection.config';
import dotenv from "dotenv";
dotenv.config();
const mappingConnection = createDBConnection(CAUTHEN_CONNECTION, { authSource: process.env.MGDB_CAUTHEN_DATABASE_DEFAULT || 'metadata' });

const userMappingSchema = new Schema({
    _id: { type: String },
    loginname: { type: String },
    name: { type: String },
    email: { type: String },
    obsoleted: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false }
}, {
    timestamps: true,
    collection: 'accountiot'
});
userMappingSchema.statics.isDeleted = function (deleted: Boolean = true) {
    return this.where({ deleted });
};
userMappingSchema.statics.isObsoleted = function (obsoleted: Boolean = true) {
    return this.where({ obsoleted });
};

export default mappingConnection.model<IUser>('accountiot', userMappingSchema);