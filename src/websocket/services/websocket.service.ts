import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DB_CONNECTION } from 'src/common/constants/database.constant';
import { MESSAGE } from 'src/common/constants/schema.constant';
import { MessageCreateDTO } from '../dto/message.dto';
import { Message, MessageDocument } from '../schemas/message.schema';

@Injectable()
export class WebsocketService {
  constructor(
    @InjectModel(MESSAGE)
    private readonly messageModel: Model<MessageDocument>,
  ) {}

  async createMessage(message: MessageCreateDTO): Promise<Message> {
    const msg: Message = await this.messageModel.create(message);

    return msg;
  }

  async findAll(): Promise<Message[]> {
    const messages: Message[] = await this.messageModel.find({});

    return messages;
  }
}
