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
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from '../users/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { LocalGuard } from './local.guard';

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
    const payload = { sub: user.id };
    const token = this.jwtService.sign(payload);
    res.cookie('auth_token', token, { httpOnly: true, sameSite: 'strict' });
    return res.send(`User registered successfully token: ${token}`);
  }
  /**
   * Стратегия local автоматически достанет username и password из тела запроса
   * Если пароль будет верным, данные пользователя окажутся в объекте req.user
   */
  @UseGuards(LocalGuard)
  @Post('signin')
  async login(@Req() req, @Res() res) {
    const { auth_token } = this.authService.auth(req.user);
    // if (!user) {
    //   throw new UnauthorizedException('Invalid credentials');
    // }
    // const payload = { sub: user.id };
    // const token = this.jwtService.sign(payload);
    res.cookie('auth_token', auth_token, { httpOnly: true, secure: true });
    res.json({ message: `${auth_token}` });
    return auth_token;
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
