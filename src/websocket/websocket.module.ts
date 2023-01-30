import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_CONNECTION } from 'src/common/constants/database.constant';
import { MESSAGE } from 'src/common/constants/schema.constant';
import { EventGateway } from './event/event.gateway';
import { MessageSchema } from './schemas/message.schema';
import { WebsocketService } from './services/websocket.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: MESSAGE,
          schema: MessageSchema,
        },
      ],
    ),
  ],
  providers: [EventGateway, WebsocketService],
})
export class WebsocketModule {}
