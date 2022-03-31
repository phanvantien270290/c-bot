/**
 * @owner BlueSky
 * @description Define interface for the Category model
 * @since 1.0.0
 * @date Jan 12, 2022
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
import { IDocument, IProperty } from "../../../interfaces/document.interface";

export interface ICategoryProp extends IProperty {
    wikiid: number, // required
    wiki_title: string, // required
    display_title?: string,
    locale?: string, // 'en'
    topic_info?: Array<any>,
    image?: string,
    description?: string,
    flags?: any,
    solutions?: any,
    parts?: Array<any>,
    tools?: Array<any>,
    ancestors: Array<string>,
    children?: Array<any>,
    guides?: Array<any>,
    documents?: Array<any>,
    contents_raw?: string,
    title?: string,
    contents?: string,
    category_info?: string,
    [x: string]: any
}

interface ICategorySchema extends IDocument {
    wikiid: number, // required
    wiki_title: string, // required
    display_title?: string,
    locale?: string, // 'en'
    topic_info?: Array<any>,
    image?: string,
    description?: string,
    flags?: any,
    solutions?: any,
    parts?: Array<any>,
    tools?: Array<any>,
    ancestors: Array<string>,
    children?: Array<any>,
    guides?: Array<any>,
    documents?: Array<any>,
    contents_raw?: string,
    title?: string,
    contents?: string,
    category_info?: string,
    [x: string]: any
}

export interface ICategory extends ICategorySchema {
    isDeleted(deleted: Boolean): any;
    isObsoleted(obsoleted: Boolean): any;
}