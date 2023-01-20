import { Exclude } from 'class-transformer';

export interface UserSerializer {
  readonly id: string;

  readonly firstName: string;

  readonly lastName: string;

  readonly organization: string;

  readonly phoneNumber: string;

  readonly email: string;

  readonly isDeleted: boolean;

  readonly isActive: boolean;
}
