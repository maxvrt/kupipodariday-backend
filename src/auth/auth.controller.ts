import { Controller, Post, Body, Res, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/create-user.dto';
import { LocalGuard } from './local.guard';
import { UsersService } from '../users/users.service';

@Controller('')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('signup')
  // тело запроса и валидация тела через DTO
  async create(@Body() createUserDto: CreateUserDto, @Res() res) {
    const user = await this.usersService.create(createUserDto);
    const { auth_token } = this.authService.auth(user);
    res.cookie('auth_token', auth_token, {
      httpOnly: true,
      sameSite: 'strict',
    });
    res.send(`User registered successfully token: ${auth_token}`);
    return auth_token;
  }
  /**
   * Стратегия local автоматически достанет username и password из тела запроса
   * Если пароль будет верным, данные пользователя окажутся в объекте req.user
   */
  @UseGuards(LocalGuard)
  @Post('signin')
  async login(@Req() req, @Res() res) {
    const { auth_token } = this.authService.auth(req.user);
    res.cookie('auth_token', auth_token, { httpOnly: true, secure: true });
    res.json({ message: `${auth_token}` });
    return auth_token;
  }
}
