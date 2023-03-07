import { IsEmail, IsNotEmpty, IsString, IsUrl, Length } from 'class-validator';

export class UpdateWishDto {
  @IsString()
  price: number;
  @IsString()
  @Length(1, 1024)
  description: string;
}
