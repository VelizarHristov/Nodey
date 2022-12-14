import { Body, Controller, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Plant } from './plant.entity';

@Controller('plants')
export class PlantsController {
  constructor(
    @InjectRepository(Plant)
    private plantsRepo: Repository<Plant>,
  ) {}

  @Post()
  create(@Body() body: any): string {
    const plant = this.plantsRepo.create({ name: body.name });
    this.plantsRepo.save(plant);
    return 'Success';
  }
}
