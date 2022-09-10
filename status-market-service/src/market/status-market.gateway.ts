import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Bind, Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { StatusMarketService } from './status-market.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class StatusMarketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private statusmarketService: StatusMarketService) {}
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: string): void {
    this.server.emit('msgToClient', payload);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    process.nextTick(async () => {
      //   client.emit('allstatus-markets', await this.status-marketService.getstatus-markets());
    });
    this.logger.log(`Client connected: ${client.id}`);
  }

  @Bind(MessageBody(), ConnectedSocket())
  @SubscribeMessage('status-market')
  async handleNewMessage(statusMarket, sender: any) {
    sender.emit('new-status-market', statusMarket);
    sender.broadcast.emit('newstatus-market', statusMarket);
  }
}
