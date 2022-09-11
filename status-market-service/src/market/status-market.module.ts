import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GetStatusMarketMiddleware } from './middlewares/find-status-market.middleware';

@Module({
  imports: [ConfigModule.forRoot()],
})
export class StatusMarketModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(GetStatusMarketMiddleware)
      .forRoutes({ path: 'status-market', method: RequestMethod.GET });
  }
}
