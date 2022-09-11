import { HttpException, Injectable } from '@nestjs/common';
import { StatusMarketService } from '../market/status-market.service';
import { WSRepository } from './web-socket.repository';

@Injectable()
export class WSService {
  constructor(private wsRepository: WSRepository) {}
  async sendConnectWS(from: string, to: string) {
    try {
      await this.wsRepository.connect(from, to);
    } catch (error) {
      throw new HttpException(error, error?.response?.statusCode || 500);
    }
  }
  async getDataWS() {
    try {
      return await this.wsRepository.getDateWS();
    } catch (error) {
      throw new HttpException(error, error?.response?.statusCode || 500);
    }
  }
}
