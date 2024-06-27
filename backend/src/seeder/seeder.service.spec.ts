import { Test, TestingModule } from '@nestjs/testing';
import { CoffeeSeederService } from './coffee-seeder.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Coffee } from '../coffee/entitites/Coffee';
import { Repository } from 'typeorm';
import { mockCoffee } from './mockData';

describe('CoffeeSeederService', () => {
  let service: CoffeeSeederService;
  let mockCoffeeRepository: Partial<Repository<Coffee>>;

  beforeEach(async () => {
    mockCoffeeRepository = {
      count: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeeSeederService,
        {
          provide: getRepositoryToken(Coffee),
          useValue: mockCoffeeRepository,
        },
      ],
    }).compile();

    service = module.get<CoffeeSeederService>(CoffeeSeederService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should skip seeding if items already exist', async () => {
    (mockCoffeeRepository.count as jest.Mock).mockResolvedValue(1);

    const consoleSpy = jest.spyOn(console, 'log');
    await service.seed();

    expect(consoleSpy).toHaveBeenCalledWith(
      'Seeding skipped: items already exist',
    );
    expect(mockCoffeeRepository.create).not.toHaveBeenCalled();
    expect(mockCoffeeRepository.save).not.toHaveBeenCalled();
  });

  it('should seed items if no items exist', async () => {
    (mockCoffeeRepository.count as jest.Mock).mockResolvedValue(0);
    (mockCoffeeRepository.create as jest.Mock).mockImplementation(
      (items) => items,
    );
    (mockCoffeeRepository.save as jest.Mock).mockResolvedValue(true);

    const consoleSpy = jest.spyOn(console, 'log');
    await service.seed();

    expect(mockCoffeeRepository.create).toBeCalledTimes(1);
    expect(mockCoffeeRepository.save).toBeCalledWith(mockCoffee);
    expect(consoleSpy).toHaveBeenCalledWith('Seeding successful!');
  });
});
