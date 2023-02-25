import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wishlist } from '../entity/Wishlist';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistRepository: Repository<Wishlist>,
  ) {}
  async findAll(): Promise<Wishlist[]> {
    return this.wishlistRepository.find();
  }
  async findOne(id: number): Promise<Wishlist> {
    // обращение к базе
    return this.wishlistRepository.findOneBy({ id: id });
  }
  async create(wishlist: Wishlist): Promise<Wishlist> {
    return this.wishlistRepository.save(wishlist);
  }
}
