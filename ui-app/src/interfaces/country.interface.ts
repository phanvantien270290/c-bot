/**
 * @owner BlueSky
 * @description Define ICountry interface
 * @since 1.0.0
 * @date Nov 11, 2020
 * @contributors
 *      Phan V Tien <tien.phan@ccintegration.com>
 */
/**
 *  * partNumber =>CCI
 * manfPartNumber =>manufactor
 * custPartNumber => Cust. Part Number (customer)
 */
import { IProperty } from './document.interface';
export interface ICountry extends IProperty {
    _id?: string;
    name?: string;
    frequency?: string;
    [x: string]: any;
}
export type ICountryNullable = ICountry | null;