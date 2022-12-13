import { Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

import { AppController } from './app.controller';
import { PlantsController } from './plants.controller';
import { initDbClient } from "./sqlClient"; // TODO: use something better, check how nest.js does it

@Module({
  imports: [],
  controllers: [AppController, PlantsController],
  providers: [],
})
export class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  initDbClient();

  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  await app.listen(3000);
}
bootstrap();
