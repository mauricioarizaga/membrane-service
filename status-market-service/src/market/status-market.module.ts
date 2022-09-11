import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StatusMarketGateway } from './status-market.gateway';
import { StatusMarketService } from './status-market.service';
import { StatusMarketController } from './status-market.controller';
import { StatusMarketRepository } from './status-market.repository';
import { GetStatusMarketMiddleware } from './middlewares/find-status-market.middleware';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [StatusMarketGateway, StatusMarketService, StatusMarketRepository],
  controllers: [StatusMarketController],
  exports: [],
})
export class StatusMarketModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(GetStatusMarketMiddleware)
      .forRoutes({ path: 'status-market', method: RequestMethod.GET });
  }
}
