import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from '../entity/User';
import { CreateUserDto } from './create-user.dto';
import { UpdateUserDto } from './update-user.dto';
import { FindUserDto } from './find-user.dto';
import { WishesService } from '../wishes/wishes.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => WishesService))
    private wishesService: WishesService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
  async findOne(id: number): Promise<User> {
    // обращение к базе
    return this.userRepository.findOneBy({ id: id });
  }
  async findByName(username: string) {
    return await this.userRepository.findOneBy({ username: username });
  }
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.create(createUserDto);
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
