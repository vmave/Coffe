import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Coffee } from '../coffee/entitites/Coffee';
import { Repository } from 'typeorm';
import { mockCoffee } from './mockData';

@Injectable()
export class CoffeeSeederService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
  ) {}

  async seed() {
    const count = await this.coffeeRepository.count();
    if (count > 0) {
      console.log('Seeding skipped: items already exist');
      return;
    }

    const items = this.coffeeRepository.create(mockCoffee);

    await this.coffeeRepository.save(items);
    console.log('Seeding successful!');
  }
}
