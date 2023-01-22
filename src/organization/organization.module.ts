import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ORGANIZATION } from 'src/common/constants/schema';
import { ResponseService } from 'src/common/response/response.service';
import { OrganizationController } from './controllers/organization.controller';
import { OrganizationSchema } from './schemas/organization.schema';
import { OrganizationService } from './services/organization.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ORGANIZATION, schema: OrganizationSchema },
    ]),
  ],
  controllers: [OrganizationController],
  providers: [OrganizationService, ResponseService],
})
export class OrganizationModule {}
