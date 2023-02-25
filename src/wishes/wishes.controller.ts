import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Wish } from '../entity/Wish';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './create-wish.dto';
import { UpdateUserDto } from '../users/update-user.dto';
import { UpdateWishDto } from './update-wish.dto';

@Controller('wishes')
export class WishesController {
  constructor(private wishesService: WishesService) {}
  @Get('last')
  async findLastMany(): Promise<Wish[]> {
    return this.wishesService.findLastMany();
  }
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Wish> {
    return this.wishesService.findOne(Number(id));
  }
  @Get()
  async findAll(): Promise<Wish[]> {
    return this.wishesService.findAll();
  }
  @Post()
  async create(@Body() createWishDto: CreateWishDto) {
    return this.wishesService.create(createWishDto);
  }
  @Put(':id')
  async updateById(
    @Param('id') id: string,
    @Body() updateWishDto: UpdateWishDto,
  ) {
    await this.wishesService.updateById(Number(id), updateWishDto);
  }
}
