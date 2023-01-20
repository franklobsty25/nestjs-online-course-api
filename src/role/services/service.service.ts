import { Injectable } from '@nestjs/common';
import { RoleCreateDTO } from '../dto/role.create.dto';

@Injectable()
export class ServiceService {
    constructor() {}

    async create(roleDTO: RoleCreateDTO) {}

    async findAll() {}

    async update() {}

    async delete() {}
}
