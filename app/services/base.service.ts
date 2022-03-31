/**
 * @owner BlueSky
 * @description Define a general business logic
 * @since 1.0.0
 * @date Mar 22, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { BulkWriteOperation, CollectionBulkWriteOptions } from 'mongodb';
import { IRepository } from '../repositories/base.repository';
import { FilterOption } from '../interfaces/mongo-option/filter-option.interface';
import { LookupOption } from '../interfaces/mongo-option/lookup-option.interface';
import { CustomResponse } from '../interfaces/custom-response.interface';
import Session from '../cores/lib/session.lib';

type OperationBulkWrite = "insertOne" | "updateOne" | "updateMany" | "replaceOne" | "deleteOne" | "deleteMany"

export interface IService {
    find(query: IQuery, option?: FilterOption): Promise<CustomResponse>;
    paginate(query: IQuery, option?: FilterOption, lookup?: LookupOption): Promise<CustomResponse>;
    paginateWithPipeline(query: IQuery, option?: FilterOption, pipeline?: object[]): Promise<CustomResponse>;
    retrieve(query: IQuery, option?: FilterOption): Promise<CustomResponse>;
    aggregate(query: IQuery, group, option?: FilterOption, lookup?: LookupOption): Promise<CustomResponse>;
    aggregateExtended(pipeline: Array<any>): Promise<CustomResponse>;
    save(data: IData, option?: FilterOption, isNew?: boolean): Promise<CustomResponse>;
    remove(query: IQuery, force?: boolean): Promise<CustomResponse>;
    deteleOne(query: IQuery, force?: boolean): Promise<CustomResponse>;
    update(query: IQuery, data: IData, options?: FilterOption): Promise<CustomResponse>;
    updateOne(query: IQuery, data: IData, options?: FilterOption): Promise<CustomResponse>;
    findAndUpdate(query: IQuery, data: IData, option?: FilterOption): Promise<CustomResponse>;
    count(query: IQuery): Promise<CustomResponse>;
    getCurrentUser(): Promise<IUser>;
    setUserToken(token: string): void;
    setData2BulkWrite(filter: any, data: object, operation: OperationBulkWrite, options: any): BulkWriteOperation<any>
}
export default class BaseService implements IService {
    public repository: IRepository;
    private token: string;
    constructor(repository: IRepository) {
        this.repository = repository;
    }

    setData2BulkWrite(filter: IQuery, data: object, operation: OperationBulkWrite, options: any): BulkWriteOperation<any> {
        let _data: BulkWriteOperation<any>;
        switch (operation) {
            case "insertOne":
                break;
            case "updateOne":
                _data = {
                    updateOne: {
                        filter,
                        update: { "$set": data },
                        upsert: false,
                        ...options
                    }
                }
                break;
            case "updateMany":
                break;
            case "replaceOne":
                break;
            case "deleteOne":
                break;
            case "deleteMany":
                break;
        }
        return _data
    }

    bulkWrite(bulkOps: BulkWriteOperation<any>[], options?: CollectionBulkWriteOptions): Promise<CustomResponse> {
        return this.repository.bulkWrite(bulkOps, options)
    }
    aggregateExtended(pipeline: any[]): Promise<CustomResponse> {
        return this.repository.aggregateExtended(pipeline);
    }

    find(query: IQuery, option: FilterOption = {}) {
        return this.repository.find(query, option);
    }

    paginate(query: IQuery, option: FilterOption = {}, lookup: LookupOption = null) {
        return this.repository.paginate(query, option, lookup);
    }

    paginateWithPipeline(query: IQuery, option: FilterOption = {}, pipeline: object[] = null) {
        return this.repository.paginateWithPipeline(query, option, pipeline);
    }
    retrieve(query: IQuery, option: FilterOption = {}) {
        return this.repository.retrieve(query, option);
    }

    aggregate(query: IQuery, group, option: FilterOption = {}, lookup: LookupOption = null) {
        return this.repository.aggregate(query, group, option, lookup);
    }

    async save(data: IData, option: FilterOption = {}) {
        const _data = await this.prePersist(data);
        return this.repository.save(_data, option);
    }

    remove(query: IQuery, force: boolean = false) {
        return this.repository.remove(query, force);
    }

    deteleOne(query: IQuery, force: boolean = false) {
        return this.repository.deleteOne(query, force);
    }

    async update(query: IQuery, data: IData, options: FilterOption = {}) {
        const _data = await this.prePersist(data);
        return this.repository.update(query, _data, options);
    }

    async updateOne(query: IQuery, data: IData, options: FilterOption = {}) {
        const _data = await this.prePersist(data);
        return this.repository.updateOne(query, _data, options);
    }

    async findAndUpdate(query: IQuery, data: IData, option: FilterOption = {}) {
        const _data = await this.prePersist(data);
        return this.repository.findAndUpdate(query, _data, option);
    }

    count(query: IQuery) {
        return this.repository.count(query);
    }

    private async prePersist(data: IData): Promise<IData> {
        const account = await this.getCurrentUser();
        if (Array.isArray(data)) {
            const _data = [];
            for (const item of data) {
                _data.push(this.setOperationTracking(item, account?.accountName));
            }
            return _data;
        }
        return this.setOperationTracking(data, account?.accountName);
    }

    private setOperationTracking(item: IData, account: string) {
        const _item = { ...item };
        _item.updatedBy = account;
        if (!_item._id) {
            _item.createdBy = account;
        }
        return _item;
    }

    async getCurrentUser(): Promise<IUser> {
        const session = new Session();
        const users = await session.getCurrents(this.token);
        return users ? users[0] : null;
    }

    setUserToken(token: string): void {
        this.token = token;
    }
}