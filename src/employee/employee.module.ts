import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EMPLOYEE } from 'src/common/constants/schema.constant';
import { ResponseService } from 'src/common/response/response.service';
import { EmployeeController } from './controllers/employee.controller';
import { EmployeeSchema } from './schemas/employee.schema';
import { EmployeeService } from './services/employee.service';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: EMPLOYEE,
      schema: EmployeeSchema,
    }])
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService, ResponseService]
})
export class EmployeeModule {}
