import {
  CacheModule,
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { GetStatusMarketMiddleware } from './market/middlewares/find-status-market.middleware';
import { StatusMarketController } from './market/status-market.controller';
import { StatusMarketRepository } from './market/status-market.repository';
import { StatusMarketService } from './market/status-market.service';
import { WSRepository } from './web-socket/web-socket.repository';
import { WSService } from './web-socket/web-socket.service';
@Module({
  imports: [ConfigModule.forRoot(), CacheModule.register({ isGlobal: true })],
  controllers: [AppController, StatusMarketController],
  providers: [
    Logger,
    StatusMarketRepository,
    StatusMarketService,
    WSRepository,
    WSService,
  ],
  exports: [WSRepository],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(GetStatusMarketMiddleware)
      .forRoutes({ path: 'status-market', method: RequestMethod.GET });
  }
}
