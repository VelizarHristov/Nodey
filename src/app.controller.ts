import { Controller, Get, Post, Render } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plant } from './plant.entity';
import { Seed } from './seed.entity';
import { Genes } from './genes.entity';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(Plant)
    private plantsRepo: Repository<Plant>,
    @InjectRepository(Seed)
    private seedsRepo: Repository<Seed>,
    @InjectRepository(Genes)
    private genesRepo: Repository<Genes>,
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
    const allGenes: Genes[] = [];
    const seeds: Seed[] = [];
    for (const plant of plants) {
      const seed = plant.tick();
      if (seed != null) {
        allGenes.push(seed.genes);
        seeds.push(seed);
      }
    }
    await Promise.all(allGenes.map(genes => this.genesRepo.save(genes)));
    const savePlants: Promise<any>[] = plants.map(plant => this.plantsRepo.save(plant));
    const saveSeeds = seeds.map(seed => this.seedsRepo.save(seed));
    await Promise.all(savePlants.concat(saveSeeds));
    return 'Success';
  }
}
