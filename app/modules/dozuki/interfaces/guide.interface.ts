/**
 * @owner BlueSky
 * @description Define interface for the Guide model
 * @since 1.0.0
 * @date Jan 17, 2022
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { IDocument, IProperty } from "../../../interfaces/document.interface";

export interface IGuideProp extends IProperty {
    dataType?: string,
    guideid: number,
    title: string,
    revisionid?: number,
    locale?: string, // 'en'
    created_date?: number,
    modified_date?: number,
    published_date?: number,
    type?: string,
    category?: string,
    subject?: string,
    summary?: string,
    difficulty?: string,
    userid?: number,
    username?: string,
    flags?: Array<any>,
    releaseTitle?: string,
    conclusion_raw?: string,
    introduction_raw?: string,
    time_required?: string,
    time_required_min?: number,
    time_required_max?: number,
    public?: boolean,
    can_edit?: boolean,
    completed?: boolean,
    steps?: Array<any>,
    [x: string]: any
}

interface IGuideSchema extends IDocument {
    dataType?: string,
    guideid: number,
    title: string,
    revisionid?: number,
    locale?: string, // 'en'
    created_date?: number,
    modified_date?: number,
    published_date?: number,
    type?: string,
    category?: string,
    subject?: string,
    summary?: string,
    difficulty?: string,
    userid?: number,
    username?: string,
    flags?: Array<any>,
    releaseTitle?: string,
    conclusion_raw?: string,
    introduction_raw?: string,
    time_required?: string,
    time_required_min?: number,
    time_required_max?: number,
    public?: boolean,
    can_edit?: boolean,
    completed?: boolean,
    steps?: Array<any>,
    [x: string]: any
}

export interface IGuide extends IGuideSchema {
    isDeleted(deleted: Boolean): any;
    isObsoleted(obsoleted: Boolean): any;
}