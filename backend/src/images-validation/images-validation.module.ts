import { Module } from '@nestjs/common';
import { S3Service } from '../s3services/s3.service';
import { ImagesValidationService } from './images-validation.service';

@Module({
  providers: [ImagesValidationService, S3Service],
  exports: [ImagesValidationService],
})
export class ImagesValidationModule {}
