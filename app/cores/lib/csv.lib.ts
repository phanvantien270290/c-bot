/**
 * @owner BlueSky
 * @description Define CSV handler for APP
 * @since 1.0.0
 * @date Apr 08, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 * 
 * @ref https://github.com/zemirco/json2csv
 */
import json2csv, { parseAsync } from "json2csv";

export default class CSVHandler {
    static fromJson(data: Array<any>, option?: json2csv.Options<any>): Promise<string> {
        return parseAsync(data, option);
    }

    static export(data: Array<any>, option?: json2csv.Options<any>): string {
        throw new Error("Please implement it before using");
    }

    static toJson(data: Array<any>, option?: json2csv.Options<any>): Promise<any> {
        throw new Error("Please implement it before using");
    }
}