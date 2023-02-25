import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from '../entity/offer';
import { Repository } from 'typeorm';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,
  ) {}
  async findAll(): Promise<Offer[]> {
    return this.offerRepository.find();
  }
  async findOne(id: number): Promise<Offer> {
    // обращение к базе
    return this.offerRepository.findOneBy({ id: id });
  }
  async create(offer: Offer): Promise<Offer> {
    return this.offerRepository.save(offer);
  }
}
