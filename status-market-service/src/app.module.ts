import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { StatusMarketModule } from './market/status-market.module';
@Module({
  imports: [ConfigModule.forRoot(), StatusMarketModule],
  controllers: [AppController],
  providers: [Logger],
})
export class AppModule {}
