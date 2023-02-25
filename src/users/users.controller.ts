import { Body, Controller, Get, Param, Post, Put, Req } from '@nestjs/common';
import { User } from '../entity/User';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(Number(id));
  }
  @Get(':name')
  findByUsername(@Param('username') username: string): Promise<User[]> {
    return this.usersService.findByUsername(username);
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
}
