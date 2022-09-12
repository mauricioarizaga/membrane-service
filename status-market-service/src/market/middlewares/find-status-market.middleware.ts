import { Request, Response, NextFunction } from 'express';
import {
  BadRequestException,
  HttpException,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { StatusMarketService } from '../status-market.service';
import { validate } from 'class-validator';
import { PairNameDTO } from '../dto/pairName.dto';
import { allPairNames } from '../../environments/config';
@Injectable()
export class GetStatusMarketMiddleware implements NestMiddleware {
  constructor(private readonly statusMarketService: StatusMarketService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const query = new PairNameDTO();
      const { from, to } = req.query;
      query.from = from.toString().toUpperCase();
      query.to = to.toString().toUpperCase();
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
      const pairAllowed = new Set([allPairNames.BTCUSD, allPairNames.ETHUSD]);
      if (!pairAllowed.has(query.from.concat(query.to))) {
        throw new BadRequestException('Pair not allowed');
      }
      next();
    } catch (error) {
      throw new HttpException(error, error?.response?.statusCode || 500);
    }
  }
}
