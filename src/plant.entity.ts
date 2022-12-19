import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

  public tick() {
    if (this.maturity != Maturity.Mature)
      this.maturity++;
    if (this.flowering && this.maturity >= Maturity.Young && this.flowerStatus != FlowerStatus.Grown)
      this.flowerStatus++;
  }
}
