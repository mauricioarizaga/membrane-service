import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { StatusMarketController } from './market/status-market.controller';
import { StatusMarketRepository } from './market/status-market.repository';
import { StatusMarketService } from './market/status-market.service';
import { WSRepository } from './web-socket/web-socket.repository';
@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, StatusMarketController],
  providers: [
    Logger,
    WSRepository,
    StatusMarketService,
    StatusMarketRepository,
  ],
})
export class AppModule {}
