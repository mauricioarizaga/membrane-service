import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import {
  channel,
  hbValues,
  tradeState,
  typeOperation,
} from '../environments/config';
import { StatusMarketRepository } from './status-market.repository';

@Injectable()
export class StatusMarketService {
  constructor(private statusMarketRepository: StatusMarketRepository) {}
  async getStatusMarket(from: string, to: string) {
    try {
      const getPair = channel.book.concat(from, to);

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

  async buySellPair(
    from: string,
    to: string,
    amount: number,
    operationType: string,
    limitPrice: number,
  ) {
    try {
      const getPair = channel.trades.concat(from, to);
      const getData = await this.statusMarketRepository.getstatusMarket(
        getPair,
      );
      if (!getData || getData === hbValues || getData.includes(hbValues)) {
        throw new NotFoundException('Data Not Found, please try again' || 404);
      }
      if (getData.includes(tradeState.tu)) {
        const dataToProcess = [...getData[getData.length - 1]];
        const flagOperation =
          dataToProcess[2] > 0 ? typeOperation.BUY : typeOperation.SELL;
        if (flagOperation === operationType)
          throw new NotFoundException(
            'We cant find an order to be executed with your type operation, please try again' ||
              404,
          );
        const effectivePrice =
          amount * dataToProcess[dataToProcess.length - 1] < 0
            ? amount * dataToProcess[dataToProcess.length - 1] * -1
            : amount * dataToProcess[dataToProcess.length - 1];
        const maxOrderLimitAmount =
          effectivePrice <= limitPrice
            ? effectivePrice
            : limitPrice / dataToProcess[dataToProcess.length - 1];
        return {
          amount,
          effectivePrice,
          maxOrderLimitAmount,
          limitPrice,
          operationType,
        };
      } else {
        throw new NotFoundException(
          'We cant find an order to be executed, please try again' || 404,
        );
      }
    } catch (error) {
      throw new HttpException(error, error?.response?.statusCode || 500);
    }
  }
}
