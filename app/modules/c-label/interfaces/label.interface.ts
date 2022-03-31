/**
 * @owner BlueSky
 * @description Handle business logic
 * @since 1.0.0
 * @date Feb 8, 2022
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 */
import { ILabelOptionProp } from './label-option.interface';
export interface ILabelProp {
    itemMasterId?: string;
    partNumber?: any;
    custPartNumber?: string;
    custId?: string;
    macAddress?: string;
    macAddresses?: string;
    ipAddress?: string;
    serialNumber?: string;
    oemSerialNumber?: string;
    unitPassword?: string;
    sfpSerialNumber1?: string;
    sfpSerialNumber2?: string;
    printedBy?: string;
    printedAt?: Date;
    revision?: string;
    regulatoryModel?: string;
    productCode?: string;
    productName?: string;
    factoryCode?: string;
    coo?: string;
    type?: string; //  Standard, FRU,
    description?: string;
    productDescription?: string;
    ean?: string;
    upc?: string;
    bios?: string;
    bmc?: string;
    sasFirmware?: string;
    expanderFirmware?: string;
    hddModel?: string;
    hddCoo?: string;
    hddSerialNumbers?: Array<string>;
    build?: string;
    modelCode?: string;
    serviceCode?: string;
    cooCode?: string;
    dateOfLabel?: string;
    option?: any;
    settings?: ILabelOptionProp;
    cid?: string;
    voltage?: string;
    amperage?: string;
    manufacturer?: string;
    eac?: string;
    is?: string;
    bis?: string;
    [x: string]: any
}
