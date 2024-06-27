import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { CoffeeType } from '../types';

@Entity('coffee')
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  imageUrl: string;

  @Column()
  price: string;

  @Column()
  type: CoffeeType;
}
