import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ROLE } from 'src/common/constants/schema.constant';
import { RoleCreateDTO } from '../dto/role.create.dto';
import { RoleDocument } from '../schemas/role.schema';

@Injectable()
export class RoleService {
  constructor(@InjectModel(ROLE) private roleModel: Model<RoleDocument>) {}

  async create(user: any, roleDTO: RoleCreateDTO) {
    const role = await this.roleModel.create({
      name: roleDTO.name,
      creator: user,
    });

    return role;
  }

  async findAll() {}

  async update() {}

  async delete() {}
}
