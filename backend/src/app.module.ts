import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeSeederModule } from './seeder/coffee-seeder.module';
import { Coffee } from './coffee/entitites/Coffee';
import { CoffeeModule } from './coffee/coffee.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'coffee-db',
      entities: [Coffee],
      synchronize: true,
    }),
    CoffeeSeederModule,
    CoffeeModule,
  ],
  controllers: [],
})
export class AppModule {}
