import { Injectable, BadRequestException } from '@nestjs/common';
import { S3Service } from '../s3services/s3.service';
import sizeOf from 'image-size';

@Injectable()
export class ImagesValidationService {
  constructor(private readonly s3Service: S3Service) {}

  async validateAndUploadImage(file: Express.Multer.File): Promise<string> {
    if (!file) {
      throw new BadRequestException('No file uploaded.');
    }

    try {
      const dimensions = sizeOf(file.buffer);
      if (!dimensions) {
        throw new BadRequestException('Invalid file type.');
      }
    } catch (error) {
      throw new BadRequestException(
        'Invalid file type. Only images are allowed.',
      );
    }

    const imageUrl = await this.s3Service.uploadFile(file);

    return imageUrl;
  }
}
