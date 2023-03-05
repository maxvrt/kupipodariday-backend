import { IsNotEmpty, IsString, IsUrl, Length } from 'class-validator';
import { ManyToOne } from 'typeorm';
import { User } from '../entity/User';

export class CreateWishDto {
  @IsString()
  @Length(1, 250)
  name: string;
  @IsUrl()
  link: string;
  @IsUrl()
  image: string;
  // как быть с типами
  @IsString()
  price: number;
  // @IsString()
  // raised: number;
  @IsString()
  @Length(1, 1024)
  description: string;
  @ManyToOne(() => User, (user) => user.wishes)
  owner: User;
}
