
export const getDialogTitle = (type: string) => {
    let title = '';
    switch (type) {
        case 'create':
            title = 'Create NEW API Token';
            break;
        case 'update':
            title = 'Edit API Token';
            break;
        default:
            title = 'API Token';
    }
    return title;
}
