import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { User } from '../entity/User';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';
import { JwtGuard } from '../auth/jwt.guard';
import { WishesService } from '../wishes/wishes.service';
import { FindUserDto } from './find-user.dto';

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private wishesService: WishesService,
  ) {}

  @Get('me')
  profile(@Req() req): Promise<User> {
    const user = req.user;
    return this.usersService.findOne(Number(user.id));
  }
  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(Number(id));
  }
  @Get(':username')
  findUser(@Param('username') username: string) {
    return this.usersService.findByName(username);
  }
  @Get(':username/wishes')
  async findUserWishes(@Param('username') username: string) {
    const { id } = await this.usersService.findByName(username);
    return this.wishesService.findWishesByOwner(id);
  }
  @Put(':id')
  async updateById(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.usersService.updateById(Number(id), updateUserDto);
  }
  @Post('find')
  findByNameEmail(@Body() findUserDto: FindUserDto) {
    return this.usersService.findNameEmail(findUserDto);
  }
}
