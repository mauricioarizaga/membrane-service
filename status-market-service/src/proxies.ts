import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

export const statusMarketServiceProxy = {
  provide: 'status-market-service',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) =>
    ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: configService.get('STATUS_MARKET_HOST'),
        port: configService.get('STATUS_MARKET_PORT'),
      },
    }),
};
