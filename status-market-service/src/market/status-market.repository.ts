import { HttpException, Injectable, Inject } from '@nestjs/common';

@Injectable()
export class StatusMarketRepository {
  constructor() {}

  async getstatusMarket(queryData, arraySelect, sort) {
    try {
    } catch (error) {
      throw new HttpException(error, error?.response?.statusCode || 500);
    }
  }
}
