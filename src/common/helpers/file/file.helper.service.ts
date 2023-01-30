import { Injectable } from "@nestjs/common";
import bytes from "bytes";
import { utils, write, read, WorkBook } from 'xlsx';
import { ENUM_FILE_EXCEL_TYPE } from "../../constants/file.enum.constant";

@Injectable()
export class FileHelperService {
    createExcelWorkbook(
        rows: Record<string, string | number | Date>[],
    ): WorkBook {
        // headers
        const headers = rows.length > 0 ? Object.keys(rows[0]) : [];

        // worksheet
        const worksheet = utils.json_to_sheet(rows);

        // workbook
        const workbook = utils.book_new();

        utils.sheet_add_aoa(worksheet, [headers], { origin: 'A1' });
        utils.book_append_sheet(
            workbook,
            worksheet,
            'Sheet 1'
        );

        return workbook;
    }

    writeExcelToBuffer(
        workbook: WorkBook,
    ): Buffer {
        // create buffer
        const buff: Buffer = write(workbook, {
            type: 'buffer',
            bookType: ENUM_FILE_EXCEL_TYPE.XLSX ?? ENUM_FILE_EXCEL_TYPE.CSV
        });

        return buff;
    }

    readExcelFromBuffer(
        file: Buffer,
    ): Record<string, string | number | Date>[] {
        // workbook
        const workbook = read(file, {
            type: 'buffer',
        });

        // worksheet
        const worksheetName = workbook.SheetNames;
        const worksheet = workbook.Sheets[worksheetName[0]];

        // rows
        const rows: Record<string, string | number | Date>[] = utils.sheet_to_json(worksheet);

        return rows;
    }

    convertToBytes(megabytes: string): number {
        return bytes(megabytes);
    }
}