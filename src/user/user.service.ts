import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { USER } from 'src/common/constants/schema';
import { UserDTO } from './dto/user.dto';
import { UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(USER) private userModel: Model<UserDocument>) {}

    async create(createUserDTO: UserDTO) {
        console.log(createUserDTO);
    }
}
