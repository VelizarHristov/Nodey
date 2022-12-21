import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Genes } from './genes.entity';
import { Seed } from './seed.entity'
import { Fruit } from './fruit.entity';

export enum Maturity {
  Seed, Sprout, Seedling, Young, Mature
}

export enum FlowerStatus {
  None, Bud, Young, Grown
}

export enum FruitStatus {
  None, Small, Unripe, Ripe
}

type PlantYield = {
  seed?: Seed;
  fruit?: Fruit;
}

@Entity()
export class Plant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  flowering: boolean;

  @Column()
  fruiting: boolean;

  @Column({
    type: "enum",
    enum: Maturity,
    default: Maturity.Seed,
  })
  maturity: Maturity;

  @Column({
    type: "enum",
    enum: FlowerStatus,
    default: FlowerStatus.None,
  })
  flowerStatus: FlowerStatus;

  @Column({
    type: "enum",
    enum: FruitStatus,
    default: FruitStatus.None,
  })
  fruitStatus: FruitStatus;

  private newGenes(): Genes {
    return { name: this.name, flowering: this.flowering, fruiting: this.fruiting };
  }

  public tick(): PlantYield {
    const output: PlantYield = { };
    if (this.maturity != Maturity.Mature)
      this.maturity++;
    if (this.flowering && this.maturity >= Maturity.Young) {
      this.flowerStatus = (this.flowerStatus + 1) % (FlowerStatus.Grown + 1);
      if (this.flowerStatus == FlowerStatus.None)
        output.seed = { genes: this.newGenes() };
    }
    if (this.fruiting && this.maturity >= Maturity.Young) {
      this.fruitStatus = (this.fruitStatus + 1) % (FruitStatus.Ripe + 1);
      if (this.fruitStatus == FruitStatus.None)
        output.fruit = { genes: this.newGenes() };
    }
    return output;
  }
}
