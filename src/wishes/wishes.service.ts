import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from '../entity/Wish';
import { Repository, UpdateResult } from 'typeorm';
import { CreateWishDto } from './create-wish.dto';
import { UpdateWishDto } from './update-wish.dto';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>,
  ) {}
  async findAll(): Promise<Wish[]> {
    return this.wishRepository.find();
  }
  async findOne(id: number): Promise<Wish> {
    // обращение к базе
    return this.wishRepository.findOneBy({ id: id });
  }
  async create(createWishDto: CreateWishDto): Promise<Wish> {
    const wish = this.wishRepository.create(createWishDto);
    return this.wishRepository.save(wish);
  }
  async updateById(
    id: number,
    updateWishDto: UpdateWishDto,
  ): Promise<UpdateResult> {
    return this.wishRepository.update({ id: id }, updateWishDto);
  }
  async findLastMany(): Promise<Wish[]> {
    return this.wishRepository.find({
      order: { id: 'DESC' },
      take: 2,
    });
  }
}
