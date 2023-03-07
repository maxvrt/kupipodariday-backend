import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { Wishlist } from '../entity/Wishlist';
import { JwtGuard } from '../auth/jwt.guard';
import { CreateWishlistDto } from './create-wishlist.dto';
import { UpdateWishlistDto } from './update-wishlist.dto';

@UseGuards(JwtGuard)
@Controller('wishlistsw')
export class WishlistsController {
  constructor(private wishlistsService: WishlistsService) {}
  @Post()
  create(@Body() createWishlistDto: CreateWishlistDto, @Req() req) {
    return this.wishlistsService.create(createWishlistDto, req.user);
  }
  @Get()
  findAll(): Promise<Wishlist[]> {
    return this.wishlistsService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Wishlist> {
    return this.wishlistsService.findOne(Number(id));
  }
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateWishlistDto: UpdateWishlistDto,
  ) {
    return await this.wishlistsService.update(Number(id), updateWishlistDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wishlistsService.delete(+id);
  }
}
