/**
 * @owner BlueSky
 * @description Define manipulations onto MongoDB collection
 * @since 1.0.0
 * @date Mar 22, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { Model, NativeError } from "mongoose";
import { FilterOption } from "../interfaces/mongo-option/filter-option.interface";
import { LookupOption } from '../interfaces/mongo-option/lookup-option.interface';
import { CustomResponse } from "../interfaces/custom-response.interface";
import { MSG } from '../utils/message.util';
import { BulkWriteOperation, BulkWriteOpResultObject, CollectionBulkWriteOptions } from "mongodb";

export interface IRepository {
    aggregate(query: IQuery, group, option: FilterOption, lookup: LookupOption): Promise<CustomResponse>;
    aggregateExtended(pipeline: Array<any>): Promise<CustomResponse>;
    find(query: IQuery, option: FilterOption): Promise<CustomResponse>;
    paginate(query: IQuery, option?: FilterOption, lookup?: LookupOption): Promise<CustomResponse>;
    paginateWithPipeline(query: IQuery, option: FilterOption, pipeline: object[]): Promise<CustomResponse>;
    save(data: IData, option: FilterOption): Promise<CustomResponse>;
    update(query: IQuery, data: IData, option: FilterOption): Promise<CustomResponse>;
    updateOne(query: IQuery, data: IData, option: FilterOption): Promise<CustomResponse>;
    history(data: IData): Promise<CustomResponse>;
    retrieve(query: IQuery, option: FilterOption): Promise<CustomResponse>;
    remove(query: IQuery, force: boolean): Promise<CustomResponse>;
    deleteOne(query: IQuery, force: boolean): Promise<CustomResponse>;
    findAndUpdate(query: IQuery, data: IData, option: FilterOption): Promise<CustomResponse>;
    count(query: IQuery): Promise<CustomResponse>;
    bulkWrite(bulkOps: Array<BulkWriteOperation<any>>, options?: CollectionBulkWriteOptions): Promise<CustomResponse>;
}

export default class BaseRepository implements IRepository {
    entity: Model<any>;
    entityHistory: Model<any>;
    constructor(entity: Model<any>, entityHistory: Model<any> = null) {
        this.entity = entity;
        this.entityHistory = entityHistory;
    }

    aggregate(query: IQuery, group, option: FilterOption = {}, lookup: LookupOption = null): Promise<CustomResponse> {
        return new Promise((resolve) => {
            const eModel = this.entity.aggregate();
            eModel.match(query).group(group);
            if (option.sort) {
                eModel.sort(option.sort);
            }
            if (option.start) {
                eModel.skip(option.start);
            }
            if (option.limit) {
                eModel.limit(option.limit);
            }
            if (lookup) {
                eModel.lookup(lookup);
            }

            eModel.exec((err, res) => {
                if (err || !res.length) {
                    resolve({ status: false, msg: err ? err.message : MSG.NOT_FOUND.FIND });
                } else {
                    resolve({ status: true, data: res });
                }
            })
        });
    }

    aggregateExtended(pipeline: Array<any>): Promise<CustomResponse> {
        return new Promise((resolve) => {
            const eModel = this.entity.aggregate(pipeline);

            eModel.exec((err, res) => {
                if (err || !res.length) {
                    resolve({ status: false, msg: err ? err.message : MSG.NOT_FOUND.FIND });
                } else {
                    resolve({ status: true, data: res });
                }
            })
        });
    }

    find(query: IQuery, option: FilterOption = {}): Promise<CustomResponse> {
        return new Promise((resolve) => {
            const eModel = this.entity.find({ deleted: { $ne: true }, ...query });
            if (option.fields) {
                eModel.select(option.fields);
            }
            if (option.sort) {
                eModel.sort(option.sort);
            } else {
                eModel.sort({ _id: -1 });
            }
            if (option.start) {
                eModel.skip(option.start);
            }
            if (option.limit) {
                eModel.limit(option.limit);
            }
            eModel.exec((err, res) => {
                if (err || !res.length) {
                    resolve({ status: false, msg: err ? err.message : MSG.NOT_FOUND.FIND });
                } else {
                    resolve({ status: true, data: res });
                }
            })
        });
    }

    paginate(query: IQuery = {}, option: FilterOption = {}, lookup: LookupOption = null): Promise<CustomResponse> {
        return new Promise((resolve) => {
            try {
                const { sort, start = 0, limit = 0, fields } = option;
                const _searchParams = { deleted: { $ne: true }, ...query };
                const $facet: any = { data: [], totalCount: [{ "$count": "count" }] };

                if (sort) {
                    $facet.data.push({ $sort: sort })
                }
                if (start > -1) {
                    $facet.data.push({ $skip: start })
                }
                if (limit > 0) {
                    $facet.data.push({ $limit: limit })
                }
                if (fields && Object.keys(fields).length > 0) {
                    $facet.data.push({ '$project': fields })
                }
                const _query: object[] = [{ "$match": _searchParams }, { "$facet": $facet }];
                if (lookup) {
                    _query.unshift({ '$lookup': lookup });
                }

                const eModel = this.entity.aggregate(_query);
                eModel.exec((err, [{ data, totalCount }]: any) => {
                    if (err || !data.length) {
                        resolve({ status: false, msg: err ? err.message : MSG.NOT_FOUND.FIND });
                    } else {
                        resolve({ status: true, data, total: totalCount[0].count });
                    }
                })
            } catch (error) {
                resolve({ status: false, msg: error ? error.message : MSG.NOT_FOUND.FIND });
            }
        });
    }
    paginateWithPipeline(criteria: IQuery = {}, option: FilterOption = {}, pipeline: object[] = null): Promise<CustomResponse> {
        return new Promise((resolve) => {
            try {
                const { sort, start = 0, limit = 0, fields } = option;
                const _criteria = { deleted: { $ne: true }, ...criteria };
                const $facet: any = { data: [], totalCount: [{ "$count": "count" }] };
                if (sort && Object.keys(sort).length) {
                    $facet.data.push({ $sort: sort })
                }
                if (start > -1) {
                    $facet.data.push({ $skip: start })
                }
                if (limit > 0) {
                    $facet.data.push({ $limit: limit })
                }
                if (fields && Object.keys(fields).length > 0) {
                    $facet.data.push({ '$project': fields })
                }
                if (pipeline && pipeline.length) {
                    for (let i in pipeline) {
                        $facet.data.push(pipeline[i])
                    }
                }

                const _query: object[] = [{ "$match": _criteria }, { "$facet": $facet }];
                const eModel = this.entity.aggregate(_query);
                eModel.exec((err, [{ data, totalCount }]: any) => {

                    if (err || !data.length) {
                        resolve({ status: false, msg: err ? err.message : MSG.NOT_FOUND.FIND });
                    } else {
                        resolve({ status: true, data, total: totalCount[0].count });
                    }
                })
            } catch (error) {
                resolve({ status: false, msg: error ? error.message : MSG.NOT_FOUND.FIND });
            }
        });
    }
    save(data: IData, option: FilterOption = {}): Promise<CustomResponse> {
        if (!option) option = {};
        return new Promise((resolve) => {
            if (Array.isArray(data)) {
                option.safe = true;
                this.entity.insertMany(data, { ...option, rawResult: true }, (err, raw) => {
                    if (err || !raw['insertedCount']) {
                        resolve({ status: false, msg: err ? err.message : MSG.NOT_FOUND.INSERT, code: err ? err['code'] : null });
                    } else {
                        this.histories(data);
                        resolve({ status: true, msg: 'Inserted successfully', data: raw });
                    }
                });
            } else {
                this.entity.create([data] as any, { ...option }, (err: any, raw: any) => {
                    if (err || !raw) {
                        resolve({ status: false, msg: err ? err.message : MSG.NOT_FOUND.CREATE, code: err ? err['code'] : null });
                    } else {
                        this.histories(data);
                        resolve({ status: true, msg: 'Inserted successfully', data: raw });
                    }
                })
            }
        });
    }

    update(query: IQuery, data: IData, option: FilterOption = {}): Promise<CustomResponse> {
        if (!option) option = {};
        Object.assign(option, { safe: true });

        return new Promise((resolve) => {
            this.entity.updateMany(query, { $set: data }, option, (err, raw) => {
                if (err || !raw.n) {
                    resolve({ status: false, msg: err ? err.message : MSG.NOT_FOUND.UPDATE, code: err ? err['code'] : null });
                } else {
                    resolve({ status: true, msg: 'Updated successfully' });
                }
            });
        });
    }

    updateOne(query: IQuery, data: IData, option: FilterOption = {}): Promise<CustomResponse> {
        if (!option) option = {};
        Object.assign(option, { safe: true });
        return new Promise((resolve) => {
            this.entity.updateOne(query, { $set: data }, option, (err, raw) => {
                if (err || !raw.n) {
                    resolve({ status: false, msg: err ? err.message : MSG.NOT_FOUND.UPDATE, code: err ? err['code'] : null });
                } else {
                    resolve({ status: true, msg: 'Updated successfully' });
                }
            });
        });
    }

    retrieve(query: IQuery, option: FilterOption = {}): Promise<CustomResponse> {
        return new Promise((resolve) => {
            const eModel = this.entity.findOne(query);
            if (option.fields) {
                eModel.select(option.fields);
            }
            if (option.sort) {
                eModel.sort(option.sort);
            }
            eModel.exec((err, res) => {
                if (err || !res) {
                    resolve({ status: false, msg: err ? err.message : MSG.NOT_FOUND.FIND });
                } else {
                    resolve({ status: true, data: res.toObject() });
                }
            });
        });
    }

    /**
     * remove is a deprecated function and has been replaced by deleteOne() (to delete a single document) and deleteMany() (to delete multiple documents)
     * @param query conditions to filter document
     * @param force  true is delete document else update {deleted : true} in document
     */
    remove(query: IQuery, force = false): Promise<CustomResponse> {
        return new Promise((resolve) => {
            if (force) {
                this.entity.remove(query, (err) => {
                    resolve({ status: err ? false : true, msg: err ? err.message : 'Deleted sucessfully.', code: err ? err['code'] : null });
                });
            } else {
                this.update(query, { deleted: true }, { multi: true }).then((res) => {
                    resolve({ status: res.status, msg: res.status ? 'Deleted sucessfully.' : res.msg });
                });
            }
        });
    }

    /**
     * @param query  conditions to filter the document
     * @param force  true value  is delete document else update {deleted : true} in document
     */
    deleteOne(query: IQuery, force: boolean = false): Promise<CustomResponse> {
        return new Promise((resolve) => {
            if (force) {
                this.entity.deleteOne(query).exec((err, res) => {
                    let response: CustomResponse = { status: res.n !== 0, msg: 'Deleted sucessfully.' }
                    if (res.n === 0) {
                        response.msg = err ? err.message : 'Deleted unsucessfully.';
                    }
                    resolve(response);
                });
            } else {
                this.updateOne(query, { deleted: true }).then((res) => {
                    resolve({ status: res.status, msg: res.status ? 'Deleted sucessfully.' : res.msg });
                })
            }
        });
    }

    findAndUpdate(query: IQuery, data: IData, option: FilterOption = {}): Promise<CustomResponse> {
        return new Promise(resolve => {
            this.entity.findOneAndUpdate(query, { $set: data }, { ...option, new: true })
                .exec((err, res) => {
                    if (err || !res) {
                        resolve({ status: false, msg: err ? err.message : MSG.NOT_FOUND.FIND });
                    } else {
                        const newData = { ...res.toObject(), ...data };
                        this.histories(newData);
                        resolve({ status: true, data: newData });
                    }
                });
        });
    }

    count(query: IQuery): Promise<CustomResponse> {
        return new Promise((resolve) => {
            this.entity.countDocuments({ deleted: { $ne: true }, ...query })
                .then(num => {
                    resolve({ status: true, data: num });
                });
        });
    }

    histories(data: IData): Promise<CustomResponse> {
        return new Promise(resolve => {
            if (!data || !this.entityHistory) {
                return resolve(null);
            }
            if (Array.isArray(data)) {
                this.entityHistory.insertMany(data, { rawResult: true }, (err, raw) => {
                    if (err || !raw['insertedCount']) {
                        resolve({ status: false, msg: err ? err.message : 'No data inserted' });
                    } else {
                        resolve({ status: true, msg: 'Inserted successfully', data: raw });
                    }
                });
            } else {
                this.history(data).then(resolve);
            }
        });
    }

    history(data: IData = {}): Promise<CustomResponse> {
        return new Promise((resolve) => {
            data.updatedAt = new Date();
            delete data._id;
            delete data._v;

            const eHis = new this.entityHistory(data);
            eHis.save(function (err) {
                if (err) {
                    resolve({ status: false, msg: err.message });
                } else {
                    resolve({ status: true, id: eHis._id });
                }
            });
        });
    }

    /**
     * Sends multiple insertOne, updateOne, updateMany, replaceOne, deleteOne,
     *  and/or deleteMany operations to the MongoDB server in one command. 
     * This is faster than sending multiple independent operations 
     * (e.g. if you use create()) because with bulkWrite() there is only one round trip to MongoDB.
     * @param bulkOps  Possible operations with the Collection.bulkWrite method
     * @param options  Options for Collection.bulkWrite
     * @returns 
     */
    bulkWrite(bulkOps: Array<BulkWriteOperation<any>>, options?: CollectionBulkWriteOptions): Promise<CustomResponse> {
        return new Promise((resolve) => {
            this.entity.bulkWrite(bulkOps, options)
                .then((res: BulkWriteOpResultObject) => {
                    let msg = 'Executed successfully:';
                    if (res.insertedCount) {
                        msg += ` Inserted ${res.insertedCount}`
                    }
                    if (res.modifiedCount) {
                        msg += `, Updated ${res.modifiedCount}`
                    }
                    resolve({ status: true, msg });
                }).catch((err: NativeError) => {
                    resolve({ status: false, msg: err.message });
                })
        });

    }

}
