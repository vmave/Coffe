import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeService } from './coffee.service';
import { Coffee } from './entitites/Coffee';
import { CoffeeController } from './coffee.controller';
import { ImagesValidationModule } from '../images-validation/images-validation.module';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee]), ImagesValidationModule],
  providers: [CoffeeService],
  controllers: [CoffeeController],
  exports: [CoffeeService],
})
export class CoffeeModule {}
