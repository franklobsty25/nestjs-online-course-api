export enum ENUM_FILE_EXCEL_TYPE {
    XLSX = 'xlsx',
    XLS = 'xls',
    CSV = 'csv',
}

export enum ENUM_FILE_EXCEL_MIME {
    XLS = 'application/vnd.ms-excel',
    XLSX = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    CSV = 'text/csv',
}

export type IFile = Express.Multer.File;