import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Seed } from './seed.entity'

export enum Maturity {
  Seed, Sprout, Seedling, Young, Mature
}

export enum FlowerStatus {
  None, Bud, Young, Grown
}

@Entity()
export class Plant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // in the future, could extract all genetically inheritable fields into a separate table which is also used by Seed
  @Column()
  flowering: boolean;

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

  public tick(): Seed | null {
    if (this.maturity != Maturity.Mature)
      this.maturity++;
    if (this.flowering && this.maturity >= Maturity.Young) {
      this.flowerStatus = (this.flowerStatus + 1) % (FlowerStatus.Grown + 1);
      if (this.flowerStatus == FlowerStatus.None) {
        return new Seed(this.name, this.flowering);
      }
    }
    return null;
  }
}
