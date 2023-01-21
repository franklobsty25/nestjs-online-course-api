import { Exclude } from 'class-transformer';
import { Role } from 'src/role/schemas/role.schema';

export interface UserSerializer {
  readonly id: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly organization: string;
  readonly phoneNumber: string;
  readonly email: string;
  readonly emailVerification: boolean;
  readonly isDeleted: boolean;
  readonly isActive: boolean;
  readonly role: Role;
}
