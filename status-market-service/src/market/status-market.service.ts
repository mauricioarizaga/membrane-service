import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { hbValues } from '../environments/config';
import { StatusMarketRepository } from './status-market.repository';

@Injectable()
export class StatusMarketService {
  constructor(private statusMarketRepository: StatusMarketRepository) {}
  async getStatusMarket(from: string, to: string) {
    try {
      const getPair = from.concat(to);
      const getData = await this.statusMarketRepository.getstatusMarket(
        getPair,
      );
      if (!getData || getData === hbValues) {
        throw new NotFoundException('Data Not Found, please try again' || 404);
      }
      if (getData.length === 3) {
        return {
          price: getData[0],
          bidAsk: getData[2] > 0 ? 'bid' : 'ask',
          totalAmount: getData[2],
          orders: getData[1],
        };
      }
      if (getData.length !== 3) {
        return {
          price: getData[getData.length - 1][0],
          bidAsk: getData[getData.length - 1][2] > 0 ? 'bid' : 'ask',
          totalAmount: getData[getData.length - 1][2],
          orders: getData[getData.length - 1][1],
        };
      }
    } catch (error) {
      throw new HttpException(error, error?.response?.statusCode || 500);
    }
  }
}
