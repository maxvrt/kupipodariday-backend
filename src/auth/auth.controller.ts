import {
  Body,
  Controller,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './login.dto';

@Controller('')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}
  @Post('signup')
  // тело запроса и валидация тела через DTO
  async create(@Body() createUserDto: CreateUserDto, @Res() res) {
    const user = await this.authService.create(createUserDto);
    const token = this.jwtService.sign({ username: user.username });
    res.cookie('auth_token', token, { httpOnly: true, sameSite: 'strict' });
    return res.send('User registered successfully');
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
    res.json({ message: 'Login successful' });
  }
}
