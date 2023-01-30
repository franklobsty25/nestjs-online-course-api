import { Injectable, PipeTransform, UnsupportedMediaTypeException } from "@nestjs/common";
import { ENUM_FILE_EXCEL_MIME, IFile } from "src/common/constants/file.enum.constant";
import { FileHelperService } from "../file.helper.service";

@Injectable()
export class FileExtractPipe implements PipeTransform {
    constructor(private readonly fileHelperService: FileHelperService) {}

    async transform(
        value: IFile
    ): Promise<IFile | Record<string, any>[]> {
        if (!value) {
            return;
        }

        if (Array.isArray(value)) {
            const extracts: IFile[] = [];

            for (const val of value) {
                await this.validate(val.mimetype);

                const extract: IFile & Record<string, any> = await this.extract(val);
                extracts.push(extract);
            }

            return extracts;
        }

        const file: IFile = value as IFile;
        await this.validate(file.mimetype);

        return this.extract(file);
    }

    async validate(mimetype: string): Promise<void> {
        if (
            !Object.values(ENUM_FILE_EXCEL_MIME).find(
                (val) => val === mimetype.toLowerCase()
            )
        ) {
            throw new UnsupportedMediaTypeException('File type invalid');
        }
    }

    async extract(value: IFile): Promise<IFile & Record<string, any>> {
        const extract: Record<string, any>[] = this.fileHelperService.readExcelFromBuffer(
            value.buffer
        );

        return {
            ...value,
            extract,
        };
    }
}