import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Genes {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column()
  flowering: boolean;
}
