import { Controller, Get, Post, Render } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plant } from './plant.entity';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(Plant)
    private plantsRepo: Repository<Plant>,
  ) {}

  @Get()
  @Render('index')
  async root() {
    const count = await this.plantsRepo.count();
    return { count };
  }

  @Post('tick')
  async tick() {
    const plants = await this.plantsRepo.find();
    for (const plant of plants)
      plant.tick();
    await Promise.all(plants.map(plant => this.plantsRepo.save(plant)));
    return 'Success'
  }
}
