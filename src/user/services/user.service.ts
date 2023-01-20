import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { USER } from 'src/common/constants/schema';
import { UserCreateDTO } from '../dto/user.create.dto';
import { User, UserDocument } from '../schemas/user.schema';
import { UserUpdateDTO } from '../dto/user.update.dto';
import { excludeUserPassword } from 'src/common/helpers/hide.password';
import {
  hashPassword,
  hasVerifyPassword,
} from 'src/common/helpers/hash.password';
import { UserSerializer } from '../serialization/user.serialize';
import { UserChangePasswordDTO } from '../dto/user.change-password';

@Injectable()
export class UserService {
  constructor(@InjectModel(USER) private userModel: Model<UserDocument>) {}

  async create(createUserDTO: UserCreateDTO): Promise<UserSerializer> {
    const { firstName, lastName, organization, phoneNumber, email, password } =
      createUserDTO;

    const hashed: string = await hashPassword(password);

    const user: User = await this.userModel.create({
      firstName,
      lastName,
      organization,
      phoneNumber,
      email,
      password: hashed,
    });

    const serializeUser: UserSerializer = excludeUserPassword(user);

    if (!serializeUser)
      throw new BadRequestException(`User failed to be created`);

    return serializeUser;
  }

  async findAllUsers(): Promise<UserSerializer[]> {
    const users: User[] = await this.userModel.find({});

    const serializeUsers = users.map((user) => excludeUserPassword(user));

    return serializeUsers;
  }

  async findByEmail(email: string): Promise<User> {
    const user: User = await this.userModel.findOne({ email });

    return user;
  }

  async findById(id: string): Promise<User> {
    const user: User = await this.userModel.findById(id);

    return user;
  }

  async changePassword(
    user: any,
    changePasswordDTO: UserChangePasswordDTO,
  ): Promise<User> {
    const { oldPassword, password, confirmPassword } = changePasswordDTO;

    const isValidOldPassword = await hasVerifyPassword(
      oldPassword,
      user.password,
    );

    if (!isValidOldPassword) {
      throw new UnauthorizedException('Password does not exist');
    }

    if (password !== confirmPassword)
      throw new BadRequestException('Password does not match');

    const hashed: string = await hashPassword(password);

    const newUser: User = await this.userModel.findByIdAndUpdate(
      user._id,
      { password: hashed },
      { new: true },
    );

    if (!newUser)
      throw new BadRequestException('User password failed to update');

    return newUser;
  }

  async update(user: any, data: UserUpdateDTO): Promise<User> {
    const newUser: User = await this.userModel.findByIdAndUpdate(
      user._id,
      data,
      {
        new: true,
      },
    );

    return newUser;
  }

  async active(user: any): Promise<User> {
    const activeUser = this.userModel.findByIdAndUpdate(
      user._id,
      { isActive: true },
      { new: true },
    );

    return activeUser;
  }

  async inactive(user: any): Promise<User> {
    const inactiveUser = this.userModel.findByIdAndUpdate(
      user._id,
      { isActive: false },
      { new: true },
    );

    return inactiveUser;
  }

  async isDeleted(user: any): Promise<User> {
    const deletedUser = this.userModel.findByIdAndUpdate(
      user._id,
      { isDeleted: true },
      { new: true },
    );

    return deletedUser;
  }

  async delete(user: any): Promise<User> {
    const deleted = await this.userModel.findByIdAndRemove(user._id);

    return deleted;
  }
}