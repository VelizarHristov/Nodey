import { Body, Controller, Post, Get, Param, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Plant } from './plant.entity';
import { NotFoundInterceptor } from './not_found.interceptor';
import { CreatePlantDto } from './create_plant.dto';
import { Seed } from './seed.entity';

@Controller('plants')
export class PlantsController {
  constructor(
    @InjectRepository(Plant)
    private plantsRepo: Repository<Plant>,
    @InjectRepository(Seed)
    private seedsRepo: Repository<Seed>,
  ) {}

  @Post()
  create(@Body() createPlantDto: CreatePlantDto): string {
    const plant = this.plantsRepo.create(createPlantDto);
    this.plantsRepo.save(plant);
    return 'Success';
  }

  @Post(':seedId')
  @UseInterceptors(new NotFoundInterceptor())
  async createFromSeed(@Param('id') id: number): Promise<string | null> {
    const seed = await this.seedsRepo.findOneBy({ id });
    if (seed === null)
      return null;
    const plant = this.plantsRepo.create(seed.paramsForPlant());
    await Promise.all([
      this.plantsRepo.save(plant),
      this.seedsRepo.delete(seed.id)
    ]);
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
