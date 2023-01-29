import { PartialType } from "@nestjs/swagger";
import { CreateEmployeeDTO } from "./employee.create.dto";

export class UpdateEmployeeDTO extends PartialType(CreateEmployeeDTO) {}