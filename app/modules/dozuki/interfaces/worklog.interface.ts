/**
 * @owner BlueSky
 * @description Define interface for the Work Log model
 * @since 1.0.0
 * @date Jan 17, 2022
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { IDocument, IProperty } from "../../../interfaces/document.interface";

export interface IWorklogProp extends IProperty {
    entryid?: number,
    guideid?: number,
    workorderid?: string,
    userid?: number,
    starttime?: number,
    endtime?: number,
    timingid?: number,
    max_form_revisionid?: number,
    guide_revisionid?: number,
    duration?: number,
    active_duration?: number,
    cancelled?: number,
    handoffid?: number,
    work_data?: Array<any>,
    signoffs?: Array<any>,
    status?: string,
    workorderid_refs?: any,
    [x: string]: any
}

interface IWorklogSchema extends IDocument {
    entryid: number,
    guideid: number,
    workorderid: string,
    userid?: number,
    starttime?: number,
    endtime?: number,
    timingid?: number,
    max_form_revisionid?: number,
    guide_revisionid?: number,
    duration?: number,
    active_duration?: number,
    cancelled?: number,
    handoffid?: number,
    work_data?: Array<any>,
    signoffs?: Array<any>,
    status?: string,
    workorderid_refs?: any,
    [x: string]: any
}

export interface IWorklog extends IWorklogSchema {
    isDeleted(deleted: Boolean): any;
    isObsoleted(obsoleted: Boolean): any;
}