import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException, ConflictException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CoffeeService } from './coffee.service';
import { ImagesValidationService } from '../images-validation/images-validation.service';
import { Coffee } from './entitites/Coffee';
import { Readable } from 'stream';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { mockCoffee } from '../seeder/mockData';

const buffer = Buffer.from('mockfile', 'utf-8');

const mockFile: Express.Multer.File = {
  fieldname: 'file',
  originalname: 'test.jpg',
  encoding: '7bit',
  mimetype: 'image/jpeg',
  destination: './uploads',
  filename: 'testfile.jpg',
  path: './uploads/testfile.jpg',
  size: 1024,
  buffer,
  stream: new Readable(),
};

describe('CoffeeService', () => {
  let service: CoffeeService;
  let mockCoffeeRepository: Partial<Repository<Coffee>>;
  let mockImagesValidationService: Partial<ImagesValidationService>;

  beforeEach(async () => {
    mockCoffeeRepository = {
      findOneBy: jest.fn(),
      find: jest.fn(),
      create: jest.fn().mockImplementation((dto) => dto),
      save: jest.fn().mockImplementation((coffee) => Promise.resolve(coffee)),
    };

    mockImagesValidationService = {
      validateAndUploadImage: jest.fn().mockResolvedValue('https://test.jpg'),
    };

    // Create the testing module
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeeService,
        {
          provide: getRepositoryToken(Coffee),
          useValue: mockCoffeeRepository,
        },
        {
          provide: ImagesValidationService,
          useValue: mockImagesValidationService,
        },
      ],
    }).compile();

    service = module.get<CoffeeService>(CoffeeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    const coffeeDto: CreateCoffeeDto = {
      title: 'Latte',
      description: 'Creamy and strong',
      type: 'arabica',
      price: '10',
    };

    it('should throw a conflict exception if the title already exists', async () => {
      (mockCoffeeRepository.findOneBy as jest.Mock).mockResolvedValueOnce(
        coffeeDto,
      );

      await expect(service.create(coffeeDto, mockFile)).rejects.toThrow(
        ConflictException,
      );
    });

    it('should create and return coffee details if valid', async () => {
      (mockCoffeeRepository.findOneBy as jest.Mock).mockResolvedValueOnce(null);
      const result = await service.create(coffeeDto, mockFile);

      expect(
        mockImagesValidationService.validateAndUploadImage,
      ).toHaveBeenCalledWith(mockFile);
      expect(mockCoffeeRepository.save).toHaveBeenCalledWith({
        ...coffeeDto,
        imageUrl: 'https://test.jpg',
      });
      expect(result).toEqual({
        ...coffeeDto,
        imageUrl: 'https://test.jpg',
      });
    });

    it('should handle image validation errors', async () => {
      (mockCoffeeRepository.findOneBy as jest.Mock).mockResolvedValueOnce(null);
      (
        mockImagesValidationService.validateAndUploadImage as jest.Mock
      ).mockRejectedValue(new BadRequestException('Invalid image'));

      await expect(service.create(coffeeDto, mockFile)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of coffee entries', async () => {
      (mockCoffeeRepository.find as jest.Mock).mockResolvedValue(mockCoffee);

      expect(await service.findAll()).toEqual(mockCoffee);
    });
  });
});
