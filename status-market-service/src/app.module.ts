import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { StatusMarketModule } from './market/status-market.module';
import { WSRepository } from './web-socket/web-socket.repository';
@Module({
  imports: [ConfigModule.forRoot(), StatusMarketModule],
  controllers: [AppController],
  providers: [Logger, WSRepository],
})
export class AppModule {}
