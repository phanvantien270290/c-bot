/**
 * @owner BlueSky
 * @description Define Header structure for Excel
 * @since 1.0.0
 * @date Dec 10, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */


import { Worksheet } from "exceljs";
import { MODULE, WORKLOG } from "./enum.util";

export const HEADER_EXCEL = {
    [MODULE.DOZUKI_WORKLOG]: {
        [WORKLOG.REPORT]: {
            mainHeader: [
                { key: "guide_title", header: "Guide Title", width: 15 },
                { key: "workorderid", header: "Work Order #", width: 15 },
                { key: "workorderid_refs", header: "C-Label OEM S/N", width: 20 },
                { key: "production_order", header: "Production Order #", width: 20 },
                { key: "category", header: "Category", width: 15 },
                { key: "difficulty", header: "Difficulty", width: 10 },
                { key: "userid", header: "User", width: 15 },
                { key: "starttime", header: "Start Time", width: 20 },
                { key: "endtime", header: "End Time", width: 20 },
                { key: "duration", header: "Duration (d:h:m:s)", width: 16 },
                { key: "signoffs", header: "Sign offs", width: 25, style: { numFmt: '@' } },
                { key: "status", header: "Status", width: 10 }
            ] as Worksheet['columns'],
            relativeFields: {}
        },
        [WORKLOG.REPORT2ACU]: {
            mainHeader: [
                { key: "order_type", header: "Order Type", width: 13 },
                { key: "production_order", header: "Production Nbr", width: 20 },
                { key: "guide_title", header: "Inventory ID", width: 15 },
                { key: "operation_id", header: "Operation ID", width: 15 },
                { key: "qty", header: "Quantity", width: 12 },
                { key: "warehouse", header: "Warehouse", width: 15 },
                { key: "location", header: "Location", width: 15 },
                { key: "workorderid_refs", header: "Lot/Serial Nbr.", width: 20 },
                { key: "expiration_date", header: "Expiration Date", width: 15 },
                { key: "receipt_no", header: "Receipt Nbr.", width: 15 },
                { key: "qty_scrapped", header: "Qty Scrapped", width: 15 },
                { key: "uom", header: "UOM", width: 10 },
                { key: "reason_code", header: "Reason Code", width: 15 }
            ] as Worksheet['columns'],
            relativeFields: {}
        }
    }
}

export const parseHeader = (module: string, key: string, obj: object) => {
    try {
        const item = {};
        const header = HEADER_EXCEL[module][key];
        for (const prop in header) {
            const title = header[prop];
            item[title] = obj[prop];
        }
        return item;
    } catch (error) {
        return obj;
    }
}