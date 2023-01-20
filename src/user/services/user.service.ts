import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { USER } from 'src/common/constants/schema.constant';
import { UserCreateDTO } from '../dto/user.create.dto';
import { User, UserDocument } from '../schemas/user.schema';
import { UserUpdateDTO } from '../dto/user.update.dto';
import { excludeUserPassword } from 'src/common/helpers/hide.password';
import { hashPassword } from 'src/common/helpers/hash.password';
import { UserSerializer } from '../serialization/user.serialize';

@Injectable()
export class UserService {
  constructor(@InjectModel(USER) private userModel: Model<UserDocument>) {}

  async create(createUserDTO: UserCreateDTO): Promise<UserSerializer> {
    const { firstName, lastName, organization, phoneNumber, email, password } =
      createUserDTO;

    const hashed = await hashPassword(password);

    const user: User = await this.userModel.create({
      firstName,
      lastName,
      organization,
      phoneNumber,
      email,
      password: hashed,
    });

    const serializeUser = excludeUserPassword(user);

    if (!serializeUser) throw new BadRequestException(`User failed to be created`);

    return serializeUser;
  }

  async findAllUsers(): Promise<UserSerializer[]> {
    const users = await this.userModel.find({});

    const serializeUsers = users.map(user => excludeUserPassword(user));

    return serializeUsers;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id);

    return user;
  }

  async update(user: any, data: UserUpdateDTO): Promise<User> {
    const newUser = await this.userModel.findByIdAndUpdate(user._id, data, {
      new: true,
    });

    return newUser;
  }

  async delete(user: any): Promise<User> {
    const deleted = await this.userModel.findByIdAndRemove(user._id);

    return deleted;
  }
}
