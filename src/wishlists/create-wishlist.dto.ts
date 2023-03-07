import { IsOptional, IsUrl, Length } from 'class-validator';
import { JoinTable, ManyToMany, ManyToOne } from 'typeorm';
import { Wish } from '../entity/Wish';
import { User } from '../entity/User';

export class CreateWishlistDto {
  @Length(1, 250)
  name: string;
  @Length(1, 1500)
  description: string;
  @IsUrl()
  image: string;
  @ManyToMany(() => Wish)
  @JoinTable()
  items: Wish[];
  @ManyToOne(() => User, (user) => user.wishes)
  owner: User;
  @IsOptional()
  itemsId: number[];
}
