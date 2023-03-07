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
    return this.offerRepository.find();
  }
  async findOne(id: number): Promise<Offer> {
    return this.offerRepository.findOneBy({ id: id });
  }
  async create(createOfferDto: CreateOfferDto, user: User): Promise<Offer> {
    const newId = Number(createOfferDto.itemId);
    const wish = await this.wishesService.findOne(newId);
    const newRised = wish.raised + Number(createOfferDto.amount);
    await this.wishesService.updateByRised(wish.id, newRised);
    return this.offerRepository.save({
      ...createOfferDto,
      user,
      item: wish,
    });
  }
}
