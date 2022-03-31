/**
 * @owner BlueSky
 * @description API Token which will provide tokens to other apps, which want to access via API
 * @since 1.0.0
 * @date Mar 22, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { Schema, model, Model } from 'mongoose';
import crypto from 'crypto';
import { IAPIToken, IToken } from "../interfaces/api-token.interface";
import JWTHandler from '../cores/lib/json-web-token.lib';

const apiTokenSchema = new Schema<IAPIToken>({
    id: { type: String, unique: true, uppercase: true },
    salt: { type: String },
    token: { type: String },
    app: { type: String, uppercase: true },
    expiredAt: { type: Date, default: new Date().setDate(new Date().getDate() + 1) },
    obsoleted: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false }
}, {
    timestamps: true,
    collection: 'apitoken'
});
apiTokenSchema.statics.isDeleted = function (deleted: Boolean = true) {
    return this.where({ deleted });
};
apiTokenSchema.statics.isObsoleted = function (obsoleted: Boolean = true) {
    return this.where({ obsoleted });
};
apiTokenSchema.methods.verifyToken = function (token: string) {
    const curTime = new Date().getTime();
    const expiredTime = this.expiredAt.getTime();

    const jwt = new JWTHandler(this.salt.toString());
    const res = jwt.verify(token, 'HS512', { ignoreExpiration: true }) as any;
    if (res.message || expiredTime < curTime) {
        res.message = res.message || `The token is expired`;
    }

    return res;
};

apiTokenSchema.post<any>('save', function (doc, next) {
    doc.salt = crypto.randomBytes(16).toString('hex');

    const jwt = new JWTHandler(doc.salt);
    const jwtState: IToken = {
        id: doc._id,
        client: doc.id,
        exp: Math.floor(new Date(doc.expiredAt).getTime() / 1000)
    };

    doc.token = jwt.define(jwtState, 'HS512');
    doc.updateOne({ token: doc.token, salt: doc.salt }, { w: 1, upsert: false }, (err, aa) => {

    });
    next();
});

apiTokenSchema.pre<any>('updateOne', async function () {
    const query = this.getQuery();
    const isObsoleted = this.get('obsoleted');
    const currentUpdateValue = this.getUpdate();
    if (this.get('id') && !isObsoleted) {
        const salt = crypto.randomBytes(16).toString('hex');
        const jwt = new JWTHandler(salt);
        const jwtState: IToken = {
            id: query._id,
            client: this.get('id'),
            exp: Math.floor(new Date(this.get('expiredAt')).getTime() / 1000)
        };
        const token = jwt.define(jwtState, 'HS512');
        const doc = await this.findOne({ id: this.get('id') });
        if (doc && doc.obsoleted) {
            this.setUpdate({
                $set: {
                    ...currentUpdateValue['$set'],
                    token: token,
                    salt: salt
                }
            });
        }
    }
});

export interface APITokenModel extends Model<IAPIToken> {
    verifyToken(token: string): Promise<boolean>
}

export default model<IAPIToken>('apitoken', apiTokenSchema);
