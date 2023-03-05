import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from '../entity/User';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';
import { FindUserDto } from './find-user.dto';
import { hashSync } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(id: number): Promise<User> {
    // обращение к базе
    return this.userRepository.findOneBy({ id: id });
  }
  async findByName(username: string) {
    return await this.userRepository.findOneBy({ username: username });
  }
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
  async updateById(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return this.userRepository.update({ id: id }, updateUserDto);
  }
  async findNameEmail(searchString: FindUserDto): Promise<User> {
    const findValue = searchString.searchStr;
    console.log(`Строка поиска - ${findValue}`);
    if (findValue.includes('@')) {
      return await this.userRepository.findOneBy({
        username: findValue,
      });
    } else {
      return await this.userRepository.findOneBy({
        email: findValue,
      });
    }
  }
}
