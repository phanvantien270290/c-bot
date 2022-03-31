/**
 * @owner BlueSky
 * @description Handle business logic
 * @since 1.0.0
 * @date Feb 8, 2022
 * @contributors
 *      Tien Phan <tien.phan@ccintegration.com>
 */
import LabelService from './services/label.service';

export default class CLabel {
    LabelService: LabelService;
    constructor() {
        this.LabelService = new LabelService();
    }
}