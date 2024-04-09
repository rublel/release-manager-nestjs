import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as ip from 'ip';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3001);
  Logger.verbose(`Server running on http://${ip.address()}:3001`, 'Bootstrap');
}
bootstrap();

// const token = '3mwihut6jddo6bznjelybgjxxvwqosknfpoma4fo6uennalb37rqa';
//
