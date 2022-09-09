import { Body, Controller, Get, Query } from '@nestjs/common';
import { StatusMarketService } from './status-market.service';

@Controller('status-market')
export class StatusMarketController {
  constructor(private readonly statusMarketService: StatusMarketService) {}

  @Get()
  async statusMarket(@Query() users) {
    const { from, to } = users;
    return await this.statusMarketService.getStatusMarket(from, to);
  }
}
