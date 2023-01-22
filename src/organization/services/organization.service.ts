import { Organization } from './../schemas/organization.schema';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ORGANIZATION } from 'src/common/constants/schema';
import { OrganizationDocument } from '../schemas/organization.schema';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectModel(ORGANIZATION)
    private organizationModel: Model<OrganizationDocument>,
  ) {}

  async getAllOrganizations(): Promise<Organization[]> {
    const organizations = await this.organizationModel.find({});
    return organizations;
  }

  async getOrganization(id: string): Promise<Organization> {
    const organization = await this.organizationModel.findOne({ _id: id });
    if (!organization) {
      throw new NotFoundException('invalid organization id');
    }
    return organization;
  }
}
