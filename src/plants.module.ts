import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Plant } from './plant.entity';
import { Seed } from './seed.entity';
import { PlantsController } from './plants.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Plant, Seed])],
  providers: [PlantsController],
  controllers: [PlantsController],
})
export class PlantsModule {}
