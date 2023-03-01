import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/User';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../users/create-user.dto';
import { compareSync, hashSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = hashSync(createUserDto.password, 10);
    // замена пароля в объекте пользователя
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = createUserDto;
    const newObj = { ...rest, password: hashedPassword };
    const user = await this.userRepository.create(newObj);
    console.log(`${JSON.stringify(newObj)}`);
    return this.userRepository.save(user);
  }
  auth(user: User) {
    const payload = { sub: user.id };
    return { auth_token: this.jwtService.sign(payload) };
  }
  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      return null;
    }
    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) {
      return null;
    }
    return user;
  }
  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
