import { ResponseService } from 'src/common/response/response.service';
import { Controller, Get, Param, Res } from '@nestjs/common';
import { OrganizationService } from '../services/organization.service';
import { Response } from 'express';

@Controller('organizations')
export class OrganizationController {
  constructor(
    private readonly responseService: ResponseService,
    private readonly organizationService: OrganizationService,
  ) {}
  @Get('list')
  async getOrganizations(@Res() res: Response): Promise<any> {
    try {
      const organizations =
        await this.organizationService.getAllOrganizations();
      this.responseService.json(
        res,
        200,
        'organizations fetched successfully',
        organizations,
      );
    } catch (error) {
      this.responseService.json(res, error);
    }
  }

  async getOrganization(@Res() res: Response, @Param() { id }: { id: string }) {
    try {
      const organization = await this.organizationService.getOrganization(id);
      this.responseService.json(
        res,
        200,
        'organization fetched successfully',
        organization,
      );
    } catch (error) {
      this.responseService.json(res, error);
    }
  }
}
