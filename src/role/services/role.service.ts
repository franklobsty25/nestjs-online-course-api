import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ROLE } from 'src/common/constants/schema.constant';
import { RoleCreateDTO } from '../dto/role.create.dto';
import { RoleUpdateDTO } from '../dto/role.update.dto';
import { Role, RoleDocument } from '../schemas/role.schema';

@Injectable()
export class RoleService {
  constructor(@InjectModel(ROLE) private roleModel: Model<RoleDocument>) {}

  async create(user: any, roleCreateDTO: RoleCreateDTO): Promise<Role> {
    const role: Role = await this.roleModel.create({
      name: roleCreateDTO.name,
      creator: user,
    });

    return role;
  }

  async findAll(): Promise<Role[]> {
    const roles: Role[] = await this.roleModel.find({});

    return roles;
  }

  async findOneById(id: string): Promise<Role> {
    const role: Role = await this.roleModel.findById(id);

    return role;
  }

  async findOneByName(name: string): Promise<Role> {
    const role: Role = await this.roleModel.findOne({ name });

    return role;
  }

  async update(role: any, roleUpdateDTO: RoleUpdateDTO): Promise<Role> {
    const newRole: Role = await this.roleModel.findByIdAndUpdate(
      role._id,
      roleUpdateDTO,
      { new: true },
    );

    return newRole;
  }

  async active(role: any): Promise<Role> {
    const activeRole = await this.roleModel.findByIdAndUpdate(
      role._id,
      { isActive: true },
      { new: true },
    );

    return activeRole;
  }

  async inactive(role: any): Promise<Role> {
    const inActiveRole = await this.roleModel.findByIdAndUpdate(
      role._id,
      { isActive: false },
      { new: true },
    );

    return inActiveRole;
  }

  async delete(role: any): Promise<Role> {
    const deletedRole: Role = await this.roleModel.findByIdAndRemove(role._id);

    return deletedRole;
  }
}
