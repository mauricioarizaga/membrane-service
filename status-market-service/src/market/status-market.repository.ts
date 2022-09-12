import {
  CACHE_MANAGER,
  HttpException,
  Inject,
  Injectable,
} from '@nestjs/common';
import Cache from 'cache-manager';

@Injectable()
export class StatusMarketRepository {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getstatusMarket(pairData: string) {
    try {
      return await this.cacheManager.get(pairData);
    } catch (error) {
      throw new HttpException(error, error?.response?.statusCode || 500);
    }
  }
}
