import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../entity/User';
import { compareSync } from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  auth(user: User) {
    const payload = { sub: user.id };
    return { auth_token: this.jwtService.sign(payload) };
  }
  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByName(username);
    if (!user) {
      return null;
    }
    //TODO проверить сравнение паролей
    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) {
      return null;
    }
    return user;
  }
}
