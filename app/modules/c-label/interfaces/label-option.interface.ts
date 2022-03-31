/**
 * @owner BlueSky
 * @description Handle business logic
 * @since 1.0.0
 * @date Feb 8, 2022
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 */

export interface ILabelOptionProp {
    product?: string,
    description?: string,
    ean?: string,
    sku?: string,
    upc?: string,
    coo?: string[],
    assembled?: string[],
    hardwareId?: string,
    partNumberCode?: string,
    productCode?: string,
    [key: string]: any
}
