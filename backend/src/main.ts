import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CoffeeSeederService } from './seeder/coffee-seeder.service';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const seeder = app.get(CoffeeSeederService);
  await seeder.seed();
  await app.listen(5555);
}
bootstrap();
