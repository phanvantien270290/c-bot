/**
 * @owner BlueSky
 * @description Define IFileInfo interface
 * @since 1.0.0
 * @date Aug 31, 2020
 * @contributors
 *      Phong V Lam <phong.lam@ccintegration.com>
 */

export interface IFileInfo {
    refId: string;
    name: string;
    contentType: string;
    path?: string;
    module?: string;
    [key: string]: any;
}