import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ResponseService } from 'src/common/response/response.service';
import { CreateEmployeeDTO } from '../dto/employee.create.dto';
import { UpdateEmployeeDTO } from '../dto/employee.update.dto';
import { EmployeeDocument } from '../schemas/employee.schema';
import { EmployeeService } from '../services/employee.service';

@Controller('employees')
export class EmployeeController {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly responseService: ResponseService,
  ) {}

  @Post('create')
  async createEmployee(
    @Req() req: Request,
    @Res() res: Response,
    @Body() employeeDTO: CreateEmployeeDTO,
  ): Promise<void> {
    try {
      const employee: EmployeeDocument = await this.employeeService.create(
        employeeDTO,
      );

      this.responseService.json(
        res,
        201,
        'Employee created successfully',
        employee,
      );
    } catch (error) {
      this.responseService.json(res, error);
    }
  }

  @Get('list')
  async findAll(@Req() req: Request, @Res() res: Response): Promise<void> {
    try {
      const employees: EmployeeDocument[] =
        await this.employeeService.findAll();

      this.responseService.json(
        res,
        200,
        'Employees found successfully',
        employees,
      );
    } catch (error) {
      this.responseService.json(res, error);
    }
  }

  @Get(':id')
  async findEmployee(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<void> {
    try {
      const employee = await this.employeeService.find(id);

      this.responseService.json(
        res,
        200,
        'Employee found successfully',
        employee,
      );
    } catch (error) {
      this.responseService.json(res, error);
    }
  }

  @Put(':id/update')
  async update(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: string,
    @Body() updateDTO: UpdateEmployeeDTO,
  ): Promise<void> {
    try {
      const employee: EmployeeDocument = await this.employeeService.updateOne(
        id,
        updateDTO,
      );

      this.responseService.json(
        res,
        200,
        'Employee updated successfully',
        employee,
      );
    } catch (error) {
      this.responseService.json(res, error);
    }
  }

  @Delete(':id/delete')
  async delete(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<void> {
    try {
      const employee: EmployeeDocument = await this.employeeService.deleteOne(
        id,
      );

      this.responseService.json(
        res,
        200,
        'Employee deleted successfully',
        employee,
      );
    } catch (error) {
      this.responseService.json(res, error);
    }
  }

  @Patch(':id/active')
  async active(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<void> {
    try {
      const employee: EmployeeDocument = await this.employeeService.active(id);

      this.responseService.json(res, 200, 'Employee is active', employee);
    } catch (error) {
      this.responseService.json(res, error);
    }
  }

  @Patch(':id/inactive')
  async inactive(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<void> {
    try {
      const employee: EmployeeDocument = await this.employeeService.inactive(
        id,
      );

      this.responseService.json(res, 200, 'Employee is inactive', employee);
    } catch (error) {
      this.responseService.json(res, error);
    }
  }
}
