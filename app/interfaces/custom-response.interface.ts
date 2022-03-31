/**
 * @owner BlueSky
 * @description Define a custom response data to End-user
 * @since 1.0.0
 * @date Mar 22, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */
export interface CustomResponse {
    status: boolean,
    msg?: string,
    data?: any,
    id?: any,
    code?: string | number,
    [key: string]: any
}