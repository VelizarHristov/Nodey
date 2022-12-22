import { Controller, Delete, Get, Param, Post, UseInterceptors } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Fruit } from '../entities/fruit.entity';
import { Seed } from '../entities/seed.entity';
import { NotFoundInterceptor } from '../not_found.interceptor';

@Controller('fruits')
export class FruitsController {
  constructor(
    @InjectRepository(Fruit)
    private fruitsRepo: Repository<Fruit>,
    @InjectRepository(Seed)
    private seedsRepo: Repository<Seed>,
  ) {}

  @Get(':id')
  @UseInterceptors(new NotFoundInterceptor())
  async get(@Param('id') id: number): Promise<Fruit | null> {
    return this.fruitsRepo.findOneBy({ id });
  }

  @Get()
  async list(): Promise<Fruit[]> {
    return this.fruitsRepo.find({ order: { id: 'ASC' } });
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    this.fruitsRepo.delete(id);
    return 'OK';
  }

  @Post('eat/:fruitId')
  @UseInterceptors(new NotFoundInterceptor())
  async createFromSeed(@Param('id') id: number): Promise<string | null> {
    const fruit = await this.fruitsRepo.findOneBy({ id });
    if (fruit === null)
      return null;
    const seed: Seed = { genes: fruit.genes };
    await Promise.all([
      this.seedsRepo.save(seed),
      this.fruitsRepo.delete(fruit.id!)
    ]);
    return 'Success';
  }
}
