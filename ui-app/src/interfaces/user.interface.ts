/**
 * @owner BlueSky
 * @description Define IUserInferface interface
 * @since 1.0.0
 * @date Nov 9, 2020
 * @contributors
 *      Phat Le <phat.le@ccintegration.com>
 */

export interface IUserInterface {
    _id: string;
    loginname: string;
    name: string;
    email: string;
    tableData?: {id: number}[];
    checked?: boolean;
}
