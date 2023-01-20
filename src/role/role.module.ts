import { Module } from '@nestjs/common';
import { ServiceService } from './services/service.service';
import { ControllerController } from './controllers/controller.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ROLE } from 'src/common/constants/schema';
import { RoleSchema } from './schemas/role.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: ROLE, schema: RoleSchema }])],
  providers: [ServiceService],
  controllers: [ControllerController],
})
export class RoleModule {}
