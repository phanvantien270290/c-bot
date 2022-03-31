/**
 * @owner BlueSky
 * @description Define IDialogProps interface
 * @since 1.0.0
 * @date Dec 09, 2021
 * @contributors
 *      Phat Le <phat.le@ccintegration.com>
 */

export interface IDialogProps {
    custId: string;
    isOpen?: boolean;
    rowData: any[];
    title?: string;
    disableBackdropClick?: boolean;
    disableEscapeKeyDown?: boolean;
    onClose: (reloadList?: boolean) => void;
    onSubmit: (newData: any) => void;
}
