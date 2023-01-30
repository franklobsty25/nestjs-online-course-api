import { Injectable, PipeTransform, UnsupportedMediaTypeException } from "@nestjs/common";
import { ENUM_FILE_EXCEL_MIME, IFile } from "src/common/constants/file.enum.constant";

@Injectable()
export class FileTypeExcelPipe implements PipeTransform {
    async transform(value: IFile | IFile[]): Promise<IFile | IFile[]> {
        if (Array.isArray(value)) {
            for (const val of value) {
                await this.validate(val.mimetype);
            }

            return value;
        }

        const file: IFile = value as IFile;
        await this.validate(file.mimetype);

        return value;
    }

    async validate(mimetype: string): Promise<void> {
        if (
            !Object.values(ENUM_FILE_EXCEL_MIME).find(
                (val) => val === mimetype.toLowerCase()
            )
        ) {
            throw new UnsupportedMediaTypeException('Unsupport file type');
        }

        return;
    }
}