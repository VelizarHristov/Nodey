import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

import { AppController } from './controllers/app.controller';
import { Plant } from './entities/plant.entity';
import { Seed } from './entities/seed.entity';
import { Fruit } from './entities/fruit.entity';
import { Genes } from './entities/genes.entity';
import { PlantsModule } from './modules/plants.module';
import { SeedsModule } from './modules/seeds.module';
import { FruitsModule } from './modules/fruits.module';

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
    TypeOrmModule.forFeature([Plant, Seed, Fruit, Genes]),
    PlantsModule,
    SeedsModule,
    FruitsModule
  ],
  controllers: [AppController]
})
export class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: false }));

  await app.listen(5000);
}
bootstrap();
