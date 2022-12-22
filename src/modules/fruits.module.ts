import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fruit } from '../entities/fruit.entity';
import { Seed } from '../entities/seed.entity';
import { FruitsController } from '../controllers/fruits.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Seed, Fruit])],
  providers: [FruitsController],
  controllers: [FruitsController],
})
export class FruitsModule {}
