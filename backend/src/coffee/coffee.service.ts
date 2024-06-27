import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Coffee } from './entitites/Coffee';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { ImagesValidationService } from '../images-validation/images-validation.service';

// This service will handle the database operations
@Injectable()
export class CoffeeService {
  constructor(
    @InjectRepository(Coffee)
    private coffeeRepository: Repository<Coffee>,
    private imagesValidationService: ImagesValidationService,
  ) {}

  async findAll(): Promise<Coffee[]> {
    return await this.coffeeRepository.find();
  }

  async create(
    createCoffeeDto: CreateCoffeeDto,
    file: Express.Multer.File,
  ): Promise<Coffee> {
    const existingCoffee = await this.coffeeRepository.findOneBy({
      title: createCoffeeDto.title,
    });

    if (existingCoffee) {
      throw new ConflictException(
        `A coffee with the title "${createCoffeeDto.title}" already exists.`,
      );
    }

    const imageUrl = await this.imagesValidationService.validateAndUploadImage(
      file,
    );

    const coffee = this.coffeeRepository.create({
      ...createCoffeeDto,
      imageUrl,
    });

    return await this.coffeeRepository.save(coffee);
  }
}
