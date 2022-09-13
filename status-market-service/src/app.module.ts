import {
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  CacheModule,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { AppController } from './app.controller';
import { TradeOperationMarketMiddleware } from './market/middlewares/buy-sell-operation.middleware';
import { GetStatusMarketMiddleware } from './market/middlewares/find-status-market.middleware';
import { StatusMarketController } from './market/status-market.controller';
import { StatusMarketRepository } from './market/status-market.repository';
import { StatusMarketService } from './market/status-market.service';
import { WSRepository } from './web-socket/web-socket.repository';
@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register({
      store: redisStore,
      host: 'redis-service',
      password: 'mauricio',
      port: 7000,
    }),
  ],
  controllers: [AppController, StatusMarketController],
  providers: [
    Logger,
    StatusMarketRepository,
    StatusMarketService,
    WSRepository,
  ],
  exports: [WSRepository],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(GetStatusMarketMiddleware)
      .forRoutes({ path: 'status-market', method: RequestMethod.GET });
    consumer
      .apply(TradeOperationMarketMiddleware)
      .forRoutes({ path: 'status-market/buy-sell', method: RequestMethod.GET });
  }
}
