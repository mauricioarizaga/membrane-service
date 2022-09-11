import { HttpException, Injectable } from '@nestjs/common';
import { WSService } from '../web-socket/web-socket.service';

@Injectable()
export class StatusMarketService {
  constructor(private wsService: WSService) {}
  async getStatusMarket(from: string, to: string) {
    try {
      await this.wsService.sendConnectWS(from, to);
      return await this.getDataWS();
    } catch (error) {
      throw new HttpException(error, error?.response?.statusCode || 500);
    }
  }
  async getDataWS() {
    try {
      return await this.wsService.getDataWS();
    } catch (error) {
      throw new HttpException(error, error?.response?.statusCode || 500);
    }
  }
}
