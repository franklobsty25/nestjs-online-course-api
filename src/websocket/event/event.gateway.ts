import {
  SubscribeMessage,
  WebSocketGateway,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageCreateDTO } from '../dto/message.dto';
import { Message } from '../schemas/message.schema';
import { WebsocketService } from '../services/websocket.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly websocketService: WebsocketService) {}

  @SubscribeMessage('createMessage')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: MessageCreateDTO,
  ): Promise<Message> {
    const message: Message = await this.websocketService.createMessage(payload);

    client.emit('responseMessage', payload);

    return message;
  }
}
