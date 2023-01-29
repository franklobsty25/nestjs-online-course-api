import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EMPLOYEE } from 'src/common/constants/schema.constant';
import { CreateEmployeeDTO } from '../dto/employee.create.dto';
import { UpdateEmployeeDTO } from '../dto/employee.update.dto';
import { EmployeeDocument } from '../schemas/employee.schema';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(EMPLOYEE)
    private readonly employeeModel: Model<EmployeeDocument>,
  ) {}

  async create(
    createEmployeeDTO: CreateEmployeeDTO,
  ): Promise<EmployeeDocument> {
    const employee: EmployeeDocument = await this.employeeModel.create(
      createEmployeeDTO,
    );

    return employee;
  }

  async findAll(): Promise<EmployeeDocument[]> {
    const employees: EmployeeDocument[] = await this.employeeModel.find({});

    return employees;
  }

  async find(employeeId: string): Promise<EmployeeDocument> {
    const employee: EmployeeDocument = await this.employeeModel.findById(
      employeeId,
    );

    if (!employee) {
      throw new NotFoundException('Employee not found');
    }

    return employee;
  }

  async updateOne(
    employeeId: string,
    updateemployeDTO: UpdateEmployeeDTO,
  ): Promise<EmployeeDocument> {
    const employeeDoc: EmployeeDocument =
      await this.employeeModel.findByIdAndUpdate(employeeId, updateemployeDTO, {
        new: true,
      });

    if (!employeeDoc) {
      throw new NotFoundException('Employee not found');
    }

    return employeeDoc;
  }

  async deleteOne(employeeId: string): Promise<EmployeeDocument> {
    const employeeDoc: EmployeeDocument =
      await this.employeeModel.findByIdAndDelete(employeeId);

    if (!employeeDoc) {
      throw new NotFoundException('Employee not found');
    }

    return employeeDoc;
  }

  async active(employeeId: string): Promise<EmployeeDocument> {
    const employeeDoc: EmployeeDocument =
      await this.employeeModel.findByIdAndUpdate(
        employeeId,
        { isActive: true },
        { new: true },
      );

    if (!employeeDoc) {
      throw new NotFoundException('Employee not found');
    }

    return employeeDoc;
  }

  async inactive(employeeId: string): Promise<EmployeeDocument> {
    const employeeDoc: EmployeeDocument =
      await this.employeeModel.findByIdAndUpdate(
        employeeId,
        { isActive: false },
        { new: false },
      );

    if (!employeeDoc) {
      throw new NotFoundException('Employee not found');
    }

    return employeeDoc;
  }
}
