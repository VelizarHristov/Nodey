import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum Maturity {
  Seed, Sprout, Seedling, Young, Mature
}

@Entity()
export class Plant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: "enum",
    enum: Maturity,
    default: Maturity.Seed,
  })
  maturity: Maturity;

  public tick() {
    if (this.maturity != Maturity.Mature)
      this.maturity++;
  }
}
