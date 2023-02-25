import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OffersService } from './offers.service';
import { Offer } from '../entity/Offer';

@Controller('offers')
export class OffersController {
  constructor(private offersService: OffersService) {}
  @Get()
  findAll(): Promise<Offer[]> {
    return this.offersService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Offer> {
    return this.offersService.findOne(Number(id));
  }
}
