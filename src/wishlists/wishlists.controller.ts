import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from '../users/create-user.dto';
import { WishlistsService } from './wishlists.service';
import { Wishlist } from '../entity/Wishlist';

@Controller('wishlists')
export class WishlistsController {
  constructor(private wishlistsService: WishlistsService) {}
  @Get()
  findAll(): Promise<Wishlist[]> {
    return this.wishlistsService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Wishlist> {
    return this.wishlistsService.findOne(Number(id));
  }
  @Post()
  create(@Body() createUserDto: CreateUserDto): string {
    return `Это метод создания нового пользователя ${createUserDto.emailName}`;
  }
}
