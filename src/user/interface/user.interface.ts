import { User } from '../schemas/user.schema';

export interface IUser extends Omit<User, 'password'> {}
