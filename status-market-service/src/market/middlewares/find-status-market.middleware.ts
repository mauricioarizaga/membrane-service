import { Request, Response, NextFunction } from 'express';
import {
  HttpException,
  Injectable,
  NestMiddleware,
  NotFoundException,
} from '@nestjs/common';
import { StatusMarketService } from '../status-market.service';
import { validate } from 'class-validator';
@Injectable()
export class GetStatusMarketMiddleware implements NestMiddleware {
  constructor(private readonly statusMarketService: StatusMarketService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const query = { hola: 'hola' };
      const errors = await validate(query);
      if (errors.length > 0) {
        res.status(500).json({
          message: errors.length > 0,
          errorType: 'Middleware',
          code: 500,
        });
        return;
      }
    } catch (error) {
      throw new HttpException(error, error?.response?.statusCode || 500);
    }
  }
}
