/**
 * @owner BlueSky
 * @description Parsing form data, especially file uploads by using formidable - A Node.js module
 * @since 1.0.0
 * @date Aug 30, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { Request, Response } from "express";
import FileService from '../services/file.service';
import { CustomResponse } from '../interfaces/custom-response.interface';
import formidable from 'formidable';
import FileHandler from "../cores/lib/file.lib";

export default class FileController {
    constructor(private service: FileService) {

    }

    upload(req: Request, res: Response) {
        const resp: CustomResponse = {
            status: true
        };
        const option: any = {
            multiples: true,
            maxFileSize: (5 * 1024 * 1024) // 5MB
        };
        const form = new formidable.IncomingForm(option);

        form.parse(req, (err, fields, files) => {
            if (err) {
                resp.status = false;
                resp.msg = err.message || `Something's gone wrongly`;
                res.status(200).send(resp);
                return;
            }
            this.service.upload(fields, files)
                .then(r => {
                    res.status(200).json(r);
                })
                .catch(err => {
                    resp.status = false;
                    resp.msg = err.message;
                    res.status(200).json(resp);
                });
        });
    }

    download(req: Request, res: Response) {
        const params = req.query;
        this.service.download(params).then((result) => {
            if (result.status) {
                res.download(result.data.path, result.data.filename);
            } else {
                res.writeHead(400, { "Content-Type": "text/plain" });
                res.end(result.msg);
            }
        });
    }

    exportExcel(req: Request, res: Response) {
        const { module, searchFields, searchText } = req.query as any;
        const query: IQuery = {
            searchFields: searchFields ? JSON.parse(searchFields) : {},
            searchText
        };

        this.service.exportExcel({ module, query }).then((result) => {
            if (result.status) {
                res.download(result.data.path, result.data.filename, () => {
                    if (result.data && result.data.path) {
                        FileHandler.remove(result.data.path);
                    }
                });
            } else {
                res.writeHead(400, { "Content-Type": "text/plain" });
                res.end(result.msg);
            }
        });
    }
}