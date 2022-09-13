import { Request, Response, NextFunction } from 'express';
import {
  BadRequestException,
  HttpException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { StatusMarketService } from '../status-market.service';
import { validate } from 'class-validator';
import { BuySellDTO } from '../dto/pairName.dto';
import { allPairNames, typeOperation } from '../../environments/config';
@Injectable()
export class TradeOperationMarketMiddleware implements NestMiddleware {
  constructor(private readonly statusMarketService: StatusMarketService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const query = new BuySellDTO();
      const { from, to, amount, operationType, limitPrice } = req.query;
      query.from = from.toString().toUpperCase();
      query.to = to.toString().toUpperCase();
      query.amount = Number(amount);
      query.operationType = operationType.toString().toUpperCase();
      query.limitPrice = Number(limitPrice);
      const errors = await validate(query);
      if (errors.length > 0) {
        res.status(500).json({
          message: errors,
          errorType: 'Middleware',
          code: 500,
        });
        return;
      }
      if (from === to) {
        throw new BadRequestException('Pair cannot be same coin');
      }
      const pairAllowedSet = new Set([
        allPairNames.BTCUSD,
        allPairNames.ETHUSD,
      ]);
      if (!pairAllowedSet.has(query.from.concat(query.to))) {
        throw new BadRequestException('Pair not allowed');
      }

      const typeOperationSet = new Set([typeOperation.BUY, typeOperation.SELL]);
      if (!typeOperationSet.has(query.operationType)) {
        throw new BadRequestException('Type operation not allowed');
      }
      next();
    } catch (error) {
      throw new HttpException(error, error?.response?.statusCode || 500);
    }
  }
}
