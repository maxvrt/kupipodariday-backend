import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from '../entity/offer';
import { Repository } from 'typeorm';
import { User } from '../entity/User';
import { CreateOfferDto } from './create-offer.dto';
import { WishesService } from '../wishes/wishes.service';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
    private readonly wishesService: WishesService,
  ) {}
  async findAll(): Promise<Offer[]> {
    return this.offerRepository.find({
      relations: {
        item: {
          owner: true,
        },
        user: {
          wishes: { owner: true },
          offers: { user: true },
          wishlists: { owner: true, items: true },
        },
      },
    });
  }
  async findOne(id: number): Promise<Offer> {
    return this.offerRepository.findOne({
      relations: {
        item: {
          owner: true,
        },
        user: {
          wishes: { owner: true },
          offers: { user: true },
          wishlists: { owner: true, items: true },
        },
      },
      where: { id: id },
    });
  }
  async create(createOfferDto: CreateOfferDto, user: User): Promise<string> {
    const newId = Number(createOfferDto.itemId);
    const wish = await this.wishesService.findOne(newId);
    const newRised = wish.raised + Number(createOfferDto.amount);
    await this.wishesService.updateByRised(wish.id, newRised);
    await this.offerRepository.save({
      ...createOfferDto,
      user,
      item: wish,
    });
    return '{}';
  }
}
