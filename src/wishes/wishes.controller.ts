import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Wish } from '../entity/Wish';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './create-wish.dto';
import { UpdateWishDto } from './update-wish.dto';
import { JwtGuard } from '../auth/jwt.guard';

@Controller('wishes')
export class WishesController {
  constructor(private wishesService: WishesService) {}
  @Get('last')
  async findLastMany(): Promise<Wish[]> {
    return this.wishesService.findLastMany();
  }
  @Get('top')
  topWishes() {
    return this.wishesService.findTop();
  }
  @UseGuards(JwtGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req): Promise<Wish> {
    console.log(`${JSON.stringify(req.user)}`);
    return this.wishesService.findOne(Number(id), req.user);
  }
  @Get()
  async findAll(): Promise<Wish[]> {
    return this.wishesService.findAll();
  }
  @UseGuards(JwtGuard)
  @Post()
  async create(@Body() createWishDto: CreateWishDto, @Req() req) {
    return this.wishesService.create(createWishDto, req.user);
  }
  @UseGuards(JwtGuard)
  @Put(':id')
  async updateById(
    @Param('id') id: string,
    @Body() updateWishDto: UpdateWishDto,
    @Req() req,
  ) {
    return await this.wishesService.updateById(
      Number(id),
      updateWishDto,
      req.user,
    );
  }
  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    return this.wishesService.remove(Number(id), req.user.id);
  }
}
