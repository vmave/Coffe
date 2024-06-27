import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CoffeeModule } from '../src/coffee/coffee.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from '../src/coffee/entitites/Coffee';
import * as path from 'path';

describe('CoffeeController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CoffeeModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: '1234',
          database: 'coffee-db',
          entities: [Coffee],
          synchronize: true,
          dropSchema: true, // clear db before each test
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('GET /coffees (check empty db)', async () => {
    const response = await request(app.getHttpServer())
      .get('/coffee')
      .expect(200);

    expect(response.body).toEqual([]);
  });

  it('POST /coffee (create coffee with file upload)', async () => {
    try {
      const newCoffee = {
        title: 'Espresso',
        description: 'Strong and smooth',
        price: '2',
        type: 'espresso',
      };

      const response = await request(app.getHttpServer())
        .post('/coffee')
        .attach('image', path.join(__dirname, './image.png'))
        .field('title', newCoffee.title)
        .field('description', newCoffee.description)
        .field('price', newCoffee.price)
        .field('type', newCoffee.type)
        .expect(201);

      expect(response.body.title).toEqual(newCoffee.title);
      expect(response.body.description).toEqual(newCoffee.description);
      expect(response.body.price).toEqual(newCoffee.price);
      expect(response.body.type).toEqual(newCoffee.type);
      expect(response.body.imageUrl).toBeDefined();
    } catch (error) {
      console.error('Failed to POST /coffees:', error);
      throw error;
    }
  });

  afterEach(async () => {
    await app.close();
  });
});
