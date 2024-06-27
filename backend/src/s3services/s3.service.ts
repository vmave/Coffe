import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class S3Service {
  private s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const uploadResult = await this.s3
      .upload({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Body: file.buffer,
        Key: `${Date.now()}-${file.originalname}`,
      })
      .promise();

    return uploadResult.Location;
  }
}
