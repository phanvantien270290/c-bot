/**
 * @owner BlueSky
 * @description Define Mongodb FileStream handler for APP
 * @since 1.0.0
 * @date Aug 30, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 * 
 */

import { MongoClient, MongoClientOptions, GridFSBucket, ObjectId } from 'mongodb';
import { createReadStream, createWriteStream } from 'fs';
import { basename } from 'path';
import { CustomResponse } from '../../interfaces/custom-response.interface';
import { IFileInfo } from '../../interfaces/file-info.interface';
const DOWNLOAD_DIR = './files/downloads';

export default class MongodbFS {
    private client: MongoClient;
    constructor(uri: string, option: MongoClientOptions = {}) {
        this.client = new MongoClient(uri, option);
        this.client.connect();
    }

    storeFile(path: string, name: string, data: IFileInfo): Promise<CustomResponse> {
        return new Promise(resolve => {
            const fileStream = createReadStream(path);

            if (fileStream) {
                const bucket = new GridFSBucket(this.client.db()),
                    option = { metadata: data || {} };

                if (!name) name = basename(path);
                const uploadStream = bucket.openUploadStream(name, option);
                fileStream.pipe(uploadStream);
                uploadStream.once("finish", function (record) {
                    resolve({ status: true, data: record });
                });
            } else {
                resolve({ status: false, msg: `Path file is incorrect` });
            }
        });
    }

    deleteFile(id: any): Promise<CustomResponse> {
        return new Promise((resolve) => {
            if (id) {
                const bucket = new GridFSBucket(this.client.db());
                if (typeof (id) === 'string') id = new ObjectId(id);
                bucket.delete(id, (err) => {
                    const res: CustomResponse = { status: true, msg: 'Deleted successfully.' };
                    if (err) {
                        res.status = false;
                        res.msg = err.message;
                    }
                    resolve(res);
                });
            } else {
                resolve({ status: false, msg: 'File not found.' });
            }
        });
    }

    retrieveFile(id: any): Promise<CustomResponse> {
        return new Promise((resolve) => {
            if (!id) {
                resolve({ status: false, msg: 'File not found.' });
                return;
            }

            const bucket = new GridFSBucket(this.client.db());
            if (typeof (id) === 'string') id = new ObjectId(id);
            bucket.find({ _id: id }).toArray().then((res) => {
                if (res && res.length) {
                    const path = DOWNLOAD_DIR + '/' + (new Date().getTime().toString() + '_' + res[0].metadata.refId + '_' + res[0].filename);
                    bucket.openDownloadStream(id)
                        .pipe(createWriteStream(path))
                        .on('error', function (error) {
                            resolve({ status: false, msg: error.message || 'Error' });
                        })
                        .on('finish', function () {
                            resolve({
                                status: true,
                                data: Object.assign(res[0], {
                                    path: path
                                })
                            });
                        });
                } else {
                    resolve({ status: false, msg: 'File not found.' });
                }
            });
        });
    }

    disconnect() {
        if (this.client)
            this.client.close(true);
    }
}