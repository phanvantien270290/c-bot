/**
 * @owner BlueSky
 * @description Define options for looking up
 * @since 1.0.0
 * @date Mar 26, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
export interface LookupOption {
    from: string, // <collection to join>,
    localField?: string, // <field from the input documents>,
    foreignField?: string, // <field from the documents of the "from" collection >,
    as: string, // <output array field >
    let?: object, // Only support from 3.6 to later 
    pipeline?: Array<any> // Only support from 3.6 to later
}