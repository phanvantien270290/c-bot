/**
 * @owner BlueSky
 * @description Define XLSX handler for APP
 * @since 1.0.0
 * @date Sep 08, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

import { readFile, utils, WorkSheet, writeFile } from 'xlsx';
import EXCELJS, { Fill, Style } from 'exceljs';
import { format } from 'date-fns';
export default class XLSXHandler {
    static toJson(filePath: string) {
        try {
            const workBook = readFile(filePath);
            const sheets = workBook.SheetNames;
            if (!sheets.length) {
                return null;
            }

            const data = {};
            for (const sheet of sheets) {
                const iSheet = workBook.Sheets[sheet];
                data[sheet] = utils.sheet_to_json(iSheet, { defval: '' });
            }

            return data;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static coverLetterCols(iSheet: WorkSheet) {
        if (iSheet) {
            const curRange = utils.decode_range(iSheet["!ref"]);
            const rStart = curRange.s.r <= 0 ? 1 : curRange.s.r,
                rEnd = curRange.e.r <= 0 ? 2000 : curRange.e.r + 1;

            const raw = {
                '!ref': (iSheet['!ref'].length < 5) ? `A${rStart}:AZ${rEnd}` : iSheet['!ref']
            };
            for (const cellName in iSheet) {
                if (cellName && !/^!/.test(cellName)) {
                    raw[cellName.toUpperCase()] = iSheet[cellName];
                } else if (cellName !== '!ref') {
                    raw[cellName] = iSheet[cellName];
                }
            }
            return raw;
        }
        return {};
    }

    static toExcel(data: Array<any>, path: string, sheetName: string = 'Sheet1') {
        const wb = utils.book_new(),
            ws = utils.json_to_sheet(data);

        utils.book_append_sheet(wb, ws, sheetName);

        return writeFile(wb, path, { type: 'binary', bookType: 'xlsx' });
    }
    // static toExcel2(data: Array<any>, header: object[], path: string, sheetName: string = 'Sheet1') {
    //     const workbook = new EXCELJS.stream.xlsx.WorkbookWriter({ filename: path, useStyles: true, })
    //     const ws = workbook.addWorksheet(sheetName, { views: [{ state: 'frozen', ySplit: 1 }] });
    //     ws.columns = header;
    //     this.fillPatternRow(ws, 1, "cccccc");
    //     this.alignText(ws, 1);
    //     this.styleRows(ws, 1);
    //     for (const i in data) {
    //         ws.addRow(data[i]);
    //         if (data[i]['workorderid_refs'] === 'NOT MATCH') {
    //             this.styleCell(ws, `C${+i + 2}`, { font: { color: { argb: 'FF0000' } } } as any)
    //         }
    //         data[i].duplicated && this.fillPatternRow(ws, +i + 2, "E5F049");
    //         this.alignText(ws, +i + 2);
    //     }
    //     return workbook.commit();
    // }
    static styleRows(ws: EXCELJS.Worksheet, index: number) {
        ws.getRow(index).eachCell((cell, colNumber: number, options?: { [x: string]: any }) => {
            cell.font = {
                bold: true,
                size: 12
            }
        })
    }
    static alignText(ws: EXCELJS.Worksheet, index: number) {
        ws.getRow(index).alignment = { vertical: "middle", horizontal: "center", "wrapText": true }
    }
    static styleCell(ws: EXCELJS.Worksheet, cell: string | number, style: Style) {
        const keys = Object.keys(style);
        for (const key of keys) {
            ws.getCell(cell).style[key] = style[key]
        }
    }
    static fillPatternRow(ws: EXCELJS.Worksheet, index: number, colorStr?: string, option?: Fill) {
        const defaultOptions: Fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: colorStr }
        }
        ws.getRow(index).fill = option || defaultOptions;
        ws.getRow(index).eachCell((cell, colNumber: number) => {
            cell.font = { bold: true, size: 12 }
            cell.fill = option || defaultOptions;
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            }
        })
    }
    static randomizeFileName(name: string) {
        return `${format(new Date(), 'yyMMdd')}-${name}-${format(new Date(), 'yyyyMMddhhmmss')}.xlsx`;
    }
}
