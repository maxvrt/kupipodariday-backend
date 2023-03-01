import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from '../users/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';

@Controller('')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('signup')
  // тело запроса и валидация тела через DTO
  async create(@Body() createUserDto: CreateUserDto, @Res() res) {
    const user = await this.authService.create(createUserDto);
    const token = this.jwtService.sign({ username: user.username });
    res.cookie('auth_token', token, { httpOnly: true, sameSite: 'strict' });
    return res.send(`User registered successfully token: ${token}`);
  }
  @Post('signin')
  async login(@Body() loginDto: LoginDto, @Res() res) {
    const user = await this.authService.validateUser(
      loginDto.username,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = this.jwtService.sign({ username: user.username });
    res.cookie('auth_token', token, { httpOnly: true, secure: true });
    res.json({ message: `Login successful. Token: ${token}` });
    return token;
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
