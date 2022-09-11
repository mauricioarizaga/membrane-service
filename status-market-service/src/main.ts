import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Transport } from '@nestjs/microservices';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { HttpException, Logger } from '@nestjs/common';

async function bootstrap() {
  try {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
      logger: WinstonModule.createLogger({
        transports: [
          new winston.transports.Console({
            format: winston.format.json(),
          }),
        ],
      }),
    });
    app.enableCors();
    if (process.env.NODE_ENV !== 'production') {
      const options = new DocumentBuilder()
        .setTitle('Status Market Service')
        .setDescription('The status market service description')
        .setVersion('1.0')
        .addTag('status-market')
        .build();
      const document = SwaggerModule.createDocument(app, options);
      SwaggerModule.setup('status-market/docs', app, document);
    }
    app.connectMicroservice({
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: parseInt(process.env.STATUS_MARKET_PORT),
      },
    });
    app.startAllMicroservices();
    await app.listen(process.env.API_PORT, async () => {
      console.log(`Running on port: ${process.env.API_PORT}`);
    });
  } catch (error) {
    Logger.error(error);
    throw new HttpException(error, error?.response?.statusCode || 500);
  }
}
bootstrap();
