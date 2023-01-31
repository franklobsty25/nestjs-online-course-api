import { Module } from '@nestjs/common';
import { RoleService } from './services/role.service';
import { RoleController } from './controllers/role.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ROLE } from 'src/common/constants/schema.constant';
import { RoleSchema } from './schemas/role.schema';
import { ResponseService } from 'src/common/response/response.service';
import { PaginationService } from 'src/common/pagination/pagination.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: ROLE, schema: RoleSchema }])],
  providers: [RoleService, ResponseService, PaginationService],
  controllers: [RoleController],
  exports: [RoleService],
})
export class RoleModule {}
