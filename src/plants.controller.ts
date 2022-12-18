import { Body, Controller, Post, Get, Param, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Plant } from './plant.entity';
import { NotFoundInterceptor } from './not_found.interceptor';

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

  @Get(':id')
  @UseInterceptors(new NotFoundInterceptor())
  async get(@Param('id') id: number): Promise<Plant | null> {
    return this.plantsRepo.findOneBy({ id });
  }

  @Get()
  async list(): Promise<Plant[]> {
    return this.plantsRepo.find({ order: { id: 'ASC' } });
  }
}
