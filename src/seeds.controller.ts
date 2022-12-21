import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Seed } from './seed.entity';
import { NotFoundInterceptor } from './not_found.interceptor';

@Controller('seeds')
export class SeedsController {
  constructor(
    @InjectRepository(Seed)
    private seedsRepo: Repository<Seed>,
  ) {}

  @Get(':id')
  @UseInterceptors(new NotFoundInterceptor())
  async get(@Param('id') id: number): Promise<Seed | null> {
    return this.seedsRepo.findOneBy({ id });
  }

  @Get()
  async list(): Promise<Seed[]> {
    return this.seedsRepo.find({ order: { id: 'ASC' } });
  }
}
