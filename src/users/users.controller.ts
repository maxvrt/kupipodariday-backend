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
import { UpdateUserDto } from './update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
  @Get('me')
  @UseGuards(JwtAuthGuard)
  getProfile() {
    return this.usersService.findOne(Number(1));
  }
  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(Number(id));
  }
  @Get(':name')
  findByUsername(@Param('username') username: string): Promise<User[]> {
    return this.usersService.findByUsername(username);
  }
  @Put(':id')
  async updateById(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.usersService.updateById(Number(id), updateUserDto);
  }
}
