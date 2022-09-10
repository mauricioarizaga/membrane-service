import { HttpException, Injectable } from '@nestjs/common';
import { StatusMarketRepository } from './status-market.repository';
const twoMonths = 1000 * 60 * 60 * 24 * 60;

@Injectable()
export class StatusMarketService {
  constructor(
    private readonly statusMarketRepository: StatusMarketRepository,
  ) {}

  async getStatusMarket(from: string, to: string) {
    try {
      const today = new Date();
      const todayIso = today.toISOString();
      const substractDays = today.getTime() - twoMonths;
      const dateTwoMonthsAgo = new Date(substractDays).toISOString();
      const select = ['from', 'to', 'message', 'createdAt'];
      const sort = { createdAt: 1 };
      const queryData = {
        from: [from, to],
        to: [from, to],
        createdAt: {
          $gte: dateTwoMonthsAgo,
          $lt: todayIso,
        },
      };
      const response = await this.statusMarketRepository.getstatusMarket(
        queryData,
        select,
        sort,
      );

      return response;
    } catch (error) {
      throw new HttpException(error, error?.response?.statusCode || 500);
    }
  }
}
