import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as ip from 'ip';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT || 3001);
  Logger.verbose(`Server running on http://${ip.address()}:3001`, 'Bootstrap');
}
bootstrap();
