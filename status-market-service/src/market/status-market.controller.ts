import { Controller, Get, Injectable, Query } from '@nestjs/common';
import { BuySellDTO, PairNameDTO } from './dto/pairName.dto';
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
  @Get('buy-sell')
  async buySellOperation(@Query() operationData: BuySellDTO) {
    const from = operationData.from.toUpperCase();
    const to = operationData.to.toUpperCase();
    const limitPrice = operationData.limitPrice;
    const amount = operationData.amount;
    const operationType = operationData.operationType.toUpperCase();
    return await this.statusMarketService.buySellPair(
      from,
      to,
      amount,
      operationType,
      limitPrice,
    );
  }
}
