import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Seed {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  flowering: boolean;

  constructor(name: string, flowering: boolean) {
    this.name = name;
    this.flowering = flowering;
  }
}
