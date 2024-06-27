import {
  Body,
  Controller,
  Get,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { CoffeeService } from './coffee.service';
import { Coffee } from './entitites/Coffee';

// This controller will define endpoints to handle all coffee request
@Controller('coffee')
export class CoffeeController {
  constructor(private readonly coffeeService: CoffeeService) {}

  @Get()
  findAll(): Promise<Coffee[]> {
    return this.coffeeService.findAll();
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 6 * 1024 * 1024 }), // 6 MB in bytes
        ],
      }),
    )
    file: Express.Multer.File,
    @Body() createCoffeeDto: CreateCoffeeDto,
  ): Promise<Coffee> {
    return this.coffeeService.create(createCoffeeDto, file);
  }
}
