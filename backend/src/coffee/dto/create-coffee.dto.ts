import { CoffeeType } from '../types';

export class CreateCoffeeDto {
  id?: number;
  title: string;
  description: string;
  price: string;
  imageUrl?: string;
  type: CoffeeType;
}
