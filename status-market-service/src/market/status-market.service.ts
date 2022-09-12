import { HttpException, Injectable } from '@nestjs/common';
import { StatusMarketRepository } from './status-market.repository';

@Injectable()
export class StatusMarketService {
  constructor(private statusMarketRepository: StatusMarketRepository) {}
  async getStatusMarket(from: string, to: string) {
    try {
      const getPair = from.concat(to);
      return await this.statusMarketRepository.getstatusMarket(getPair);
    } catch (error) {
      throw new HttpException(error, error?.response?.statusCode || 500);
    }
  }
}
