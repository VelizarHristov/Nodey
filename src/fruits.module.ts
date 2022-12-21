import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fruit } from './fruit.entity';
import { Seed } from './seed.entity';
import { FruitsController } from './fruits.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Seed, Fruit])],
  providers: [FruitsController],
  controllers: [FruitsController],
})
export class FruitsModule {}
