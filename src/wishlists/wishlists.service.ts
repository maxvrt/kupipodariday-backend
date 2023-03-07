import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wishlist } from '../entity/Wishlist';
import { User } from '../entity/User';
import { CreateWishlistDto } from './create-wishlist.dto';
import { WishesService } from '../wishes/wishes.service';
import { UpdateWishlistDto } from './update-wishlist.dto';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistRepository: Repository<Wishlist>,
    private wishesService: WishesService,
  ) {}
  async findAll(): Promise<Wishlist[]> {
    console.log(`контроллер вишлистов`);
    return this.wishlistRepository.find({
      relations: {
        owner: true,
        items: true,
      },
    });
  }
  async findOne(id: number): Promise<Wishlist> {
    return await this.wishlistRepository.findOne({
      where: { id: id },
      relations: ['items', 'owner'],
    });
  }
  async create(
    createWishlistDto: CreateWishlistDto,
    user: User,
  ): Promise<Wishlist> {
    const items = await this.wishesService.findMany(createWishlistDto.itemsId);
    return this.wishlistRepository.save({
      ...createWishlistDto,
      owner: user,
      items,
    });
  }
  update(id: number, updateWishlistDto: UpdateWishlistDto) {
    return this.wishlistRepository.update(id, updateWishlistDto);
  }
  delete(id: number) {
    return this.wishlistRepository.delete(id);
  }
}
