import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeSeederService } from './coffee-seeder.service';
import { Coffee } from '../coffee/entitites/Coffee';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee])],
  providers: [CoffeeSeederService],
  exports: [CoffeeSeederService],
})
export class CoffeeSeederModule {}
