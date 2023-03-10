import { IsOptional, IsUrl, Length } from 'class-validator';
import { JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { Wish } from '../entity/Wish';
import { User } from '../entity/User';

export class UpdateWishlistDto {
  @Length(1, 250)
  name: string;
  @IsUrl()
  image: string;
  @IsOptional()
  itemsId: number[];
}
