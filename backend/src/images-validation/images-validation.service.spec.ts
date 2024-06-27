import { Test, TestingModule } from '@nestjs/testing';
import { S3Service } from '../s3services/s3.service';
import { ImagesValidationService } from './images-validation.service';
import { BadRequestException } from '@nestjs/common';

jest.mock('image-size', () => ({
  __esModule: true,
  default: jest.fn((buffer) => {
    const content = buffer.toString();
    if (content.includes('valid image data')) {
      return { width: 100, height: 100 };
    }
    throw new Error('Invalid image');
  }),
}));

describe('ImagesValidationService', () => {
  let service: ImagesValidationService;
  let mockS3Service: Partial<S3Service>;

  beforeEach(async () => {
    mockS3Service = {
      uploadFile: jest.fn().mockResolvedValue('https://test.jpg'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ImagesValidationService,
        {
          provide: S3Service,
          useValue: mockS3Service,
        },
      ],
    }).compile();

    service = module.get<ImagesValidationService>(ImagesValidationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw a BadRequestException if no file is uploaded', async () => {
    await expect(service.validateAndUploadImage(null)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should throw a BadRequestException if the file is not a valid image', async () => {
    const mockFile = {
      buffer: Buffer.from('not an image', 'utf-8'),
    } as Express.Multer.File;

    await expect(service.validateAndUploadImage(mockFile)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should successfully upload a valid image file', async () => {
    const mockFile = {
      buffer: Buffer.from('valid image data', 'utf-8'),
      mimetype: 'image/jpeg',
    } as Express.Multer.File;

    await expect(service.validateAndUploadImage(mockFile)).resolves.toEqual(
      'https://test.jpg',
    );
    expect(mockS3Service.uploadFile).toHaveBeenCalledWith(mockFile);
  });
});
