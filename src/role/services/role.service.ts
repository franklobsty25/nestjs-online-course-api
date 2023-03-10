import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ROLE_ENUM } from 'src/common/constants/role.enum.constant';
import { ROLE } from 'src/common/constants/schema.constant';
import { RoleCreateDTO } from '../dto/role.create.dto';
import { RoleUpdateDTO } from '../dto/role.update.dto';
import { Role, RoleDocument } from '../schemas/role.schema';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(ROLE)
    private readonly roleModel: Model<RoleDocument>,
  ) {}

  async create(roleCreateDTO: RoleCreateDTO): Promise<Role> {
    const role: Role = await this.roleModel.create({
      name: roleCreateDTO.name,
      accessFor: roleCreateDTO.name.toLocaleUpperCase(),
    });

    return role;
  }

  async findAll(limit: number, skip: number): Promise<Role[]> {
    const roles: Role[] = await this.roleModel
      .find({})
      .limit(limit)
      .skip(skip)
      .sort('asc');

    return roles;
  }

  async getTotals(): Promise<number> {
    const total: number = await this.roleModel.find({}).count();

    return total;
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
      {
        name: roleUpdateDTO.name,
        accessFor: roleUpdateDTO.name.toUpperCase(),
      },
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

  async deleteAll(): Promise<void> {
    await this.roleModel.deleteMany({});
  }

  async courseStatus(status: string) {
    console.log('Admin role');
  }

  async createDefaultRoles(): Promise<any> {
    try {
      const adminRole: Role = await this.create({
        name: ROLE_ENUM.Admin,
      });

      const userRole: Role = await this.create({
        name: ROLE_ENUM.User,
      });

      return { adminRole, userRole };
    } catch (error) {
      throw new Error(error);
    }
  }
}