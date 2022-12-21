import { Entity, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { Genes } from './genes.entity';

@Entity()
export class Fruit {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne((type) => Genes, { eager: true })
  @JoinColumn()
  genes: Genes;
}
