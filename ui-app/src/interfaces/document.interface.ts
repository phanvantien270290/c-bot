/**
 * @owner BlueSky
 * @description Define Document interface for others
 * @since 1.0.0
 * @date Oct 30, 2020
 * @contributors
 *      Phan V Tien <tien.phan@ccintegration.com>
 */

export interface IProperty {
    deleted?: boolean;
    obsoleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    createdBy?: string;
    updatedBy?: string;
    lastUpdate?: any;
}