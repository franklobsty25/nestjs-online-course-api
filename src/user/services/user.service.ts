import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { USER } from 'src/common/constants/schema';
import { UserDTO } from '../dto/user.dto';
import { User, UserDocument } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { UserUpdateDTO } from '../dto/user.update.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(USER) private userModel: Model<UserDocument>) {}

  async create(createUserDTO: UserDTO): Promise<User> {
    const { password } = createUserDTO;

    const hash = await bcrypt.hash(password, 12);
    createUserDTO.password = hash;

    const user: User = await this.userModel.create(createUserDTO);

    if (!user) throw new BadRequestException();

    return user;
  }

  async findAllUsers(): Promise<User[]> {
    const users = await this.userModel.find({});

    return users;
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
