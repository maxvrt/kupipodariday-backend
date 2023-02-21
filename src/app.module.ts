import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/User';
import { Wish } from './entity/Wish';
import { Offer } from './entity/Offer';
import { Wishlist } from './entity/Wishlist';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      // параметр конфига
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'student',
      password: 'student',
      database: 'kupipodariday',
      entities: [User, Wish, Offer, Wishlist],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  //fdsaf
}
