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

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private wishesService: WishesService,
  ) {}

  @UseGuards(JwtGuard)
  @Get('me')
  profile(@Req() req): Promise<User> {
    const user = req.user;
    return this.usersService.findOne(Number(user.id));
  }
  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(Number(id));
  }
  @UseGuards(JwtGuard)
  @Get(':username')
  findUser(@Param('username') username: string) {
    return this.usersService.findByName(username);
  }
  @UseGuards(JwtGuard)
  @Get(':username/wishes')
  async findUserWishes(@Param('username') username: string) {
    const { id } = await this.usersService.findByName(username);
    return this.wishesService.findWishesByName(id);
  }
  @Post()
  // тело запроса и валидация тела через DTO
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
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
