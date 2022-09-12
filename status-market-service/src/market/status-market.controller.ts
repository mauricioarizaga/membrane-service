import { Controller, Get, Injectable, Query } from '@nestjs/common';
import { PairNameDTO } from './dto/pairName.dto';
import { StatusMarketService } from './status-market.service';
@Injectable()
@Controller('status-market')
export class StatusMarketController {
  constructor(private readonly statusMarketService: StatusMarketService) {}

  @Get()
  async statusMarket(@Query() pair: PairNameDTO) {
    const from = pair.from.toUpperCase();
    const to = pair.to.toUpperCase();
    return await this.statusMarketService.getStatusMarket(from, to);
  }
}
