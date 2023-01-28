import { Module } from '@nestjs/common';
import { RoleService } from './services/role.service';
import { RoleController } from './controllers/role.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ROLE } from 'src/common/constants/schema.constant';
import { RoleSchema } from './schemas/role.schema';
import { ResponseService } from 'src/common/response/response.service';

@Module({
  imports: [
    MongooseModule.forFeature(
<<<<<<< HEAD
      [{ name: ROLE, schema: RoleSchema }]
=======
      [{ name: ROLE, schema: RoleSchema }],
      DB_CONNECTION,
>>>>>>> 74b1ed721c7db7facfc476e084ab78e28721606f
    ),
  ],
  providers: [RoleService, ResponseService],
  controllers: [RoleController],
  exports: [RoleService],
})
export class RoleModule {}
