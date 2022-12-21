import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seed } from './seed.entity';
import { SeedsController } from './seeds.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Seed])],
  providers: [SeedsController],
  controllers: [SeedsController],
})
export class SeedsModule {}
