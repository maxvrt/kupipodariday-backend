import { Column, ManyToOne } from 'typeorm';
import { User } from '../entity/User';
import { Wish } from '../entity/Wish';
import { IsNumber } from 'class-validator';

export class CreateOfferDto {
  @ManyToOne(() => Wish, (wish) => wish.offers)
  item: Wish;
  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;
  @Column('boolean', { default: false })
  hidden: false;
  @IsNumber()
  itemId: number;
}
