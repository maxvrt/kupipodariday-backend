import { Module } from '@nestjs/common';
import { WishesService } from './wishes.service';
import { WishesController } from './wishes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wish } from '../entity/Wish';
import { User } from '../entity/User';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from '../auth/jwt.strategy';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Wish]),
    TypeOrmModule.forFeature([User]),
    UsersModule,
  ],
  providers: [WishesService, JwtStrategy, UsersService],
  controllers: [WishesController],
  exports: [WishesService],
})
export class WishesModule {}
