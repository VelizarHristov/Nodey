import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Plant } from '../entities/plant.entity';
import { Seed } from '../entities/seed.entity';
import { PlantsController } from '../controllers/plants.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Plant, Seed])],
  providers: [PlantsController],
  controllers: [PlantsController],
})
export class PlantsModule {}
