import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { User } from '../entity/User';
import { UsersService } from './users.service';
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
  @Get('me/wishes')
  async findMyWishes(@Req() req) {
    return this.wishesService.findWishesByOwner(req.user.id);
  }
  @Get(':username/wishes')
  async findUserWishes(@Param('username') username: string) {
    const { id } = await this.usersService.findByName(username);
    return this.wishesService.findWishesByOwner(id);
  }
  @Patch('me')
  async updateById(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    await this.usersService.updateById(req.user.id, updateUserDto);
    return this.usersService.findOne(req.user.id);
  }
  @Post('find')
  findByNameEmail(@Body() findUserDto: FindUserDto) {
    return this.usersService.findNameEmail(findUserDto);
  }
}
