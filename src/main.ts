import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

import { AppController } from './app.controller';
import { Plant } from './plant.entity';
import { PlantsModule } from './plants.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'Velizar',
      password: '123456',
      database: 'Nodey',
      autoLoadEntities: true,
      synchronize: true, // TODO: probably shouldn't be constantly true
    }),
    TypeOrmModule.forFeature([Plant]),
    PlantsModule
  ],
  controllers: [AppController]
})
export class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  await app.listen(5000);
}
bootstrap();
