/**
 * @owner BlueSky
 * @description Define options for filtering
 * @since 1.0.0
 * @date Mar 22, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
export interface FilterOption {
    start?: number,
    limit?: number,
    page?: number,
    sort?: object,
    fields?: object,
    [key: string]: any
}