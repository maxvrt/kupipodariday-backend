import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from '../entity/Wish';
import { FindManyOptions, In, Repository, UpdateResult } from 'typeorm';
import { CreateWishDto } from './create-wish.dto';
import { UpdateWishDto } from './update-wish.dto';
import { User } from '../entity/User';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>,
  ) {}
  async findAll(): Promise<Wish[]> {
    return this.wishRepository.find();
  }
  async findOne(id: number): Promise<Wish> {
    // обращение к базе с запросом нужных зависимостей
    const wish: Wish = await this.wishRepository.findOne({
      relations: {
        owner: true,
        offers: {
          user: {
            wishlists: {
              owner: true,
              items: true,
            },
          },
        },
      },
      where: { id },
    });
    const newWish = {
      ...wish,
      offers: wish.offers
        .filter((offer) => offer.hidden === false)
        .map((offer) => ({
          ...offer,
          user: {
            ...offer.user,
            password: undefined,
          },
        })),
    };
    delete newWish.owner.password;
    return newWish;
  }
  async create(createWishDto: CreateWishDto, user: User): Promise<string> {
    const wish = this.wishRepository.create({ ...createWishDto, owner: user });
    await this.wishRepository.save(wish);
    return '{}';
  }
  async updateByOwner(
    id: number,
    updateWishDto: UpdateWishDto,
    user: User,
  ): Promise<string> {
    const wish = await this.wishRepository.findOne({
      where: { id: id },
      relations: ['owner'],
    });
    if (user.id === wish.owner.id && wish.raised < 0.1) {
      await this.wishRepository.update({ id: id }, updateWishDto);
      return '{}';
    } else {
      throw new UnauthorizedException('Это желание нельзя редактировать');
    }
  }
  async updateByCopied(id: number): Promise<UpdateResult> {
    const wish = await this.wishRepository.findOneBy({ id: id });
    const newCopied = wish.copied + 1;
    return await this.wishRepository.update({ id: id }, { copied: newCopied });
  }
  async updateByRised(id: number, newRised: number): Promise<UpdateResult> {
    // const wish = await this.wishRepository.findOneBy({ id: id });
    // if (!wish) {
    //   throw new NotFoundException(`Wish with ID ${id} not found`);
    // }
    // wish.raised = newRised;
    // return this.wishRepository.save(wish);
    return await this.wishRepository.update({ id: id }, { raised: newRised });
  }
  async findLastMany(): Promise<Wish[]> {
    return this.wishRepository.find({
      relations: {
        owner: true,
        offers: {
          user: {
            wishlists: {
              owner: true,
              items: true,
            },
          },
        },
      },
      order: { id: 'DESC' },
      take: 40,
    });
  }
  async findTop(): Promise<Wish[]> {
    return this.wishRepository.find({
      relations: {
        owner: true,
        offers: {
          user: {
            wishlists: {
              owner: true,
              items: true,
            },
          },
        },
      },
      order: { copied: 'DESC' },
      take: 20,
    });
  }
  // TODO посмотреть удаление желания
  async remove(id: number, userId) {
    const wish = await this.wishRepository.findOne({
      where: { id: id },
      relations: ['owner'],
    });
    if (wish.owner.id === userId) await this.wishRepository.delete({ id });
    else throw new UnauthorizedException('Чужое желание нельзя удалить');
    return `This action removes a #${id} wish`;
  }
  findWishesByOwner(id: number): Promise<Wish[]> {
    return this.wishRepository.find({
      relations: {
        offers: {
          user: {
            wishes: {
              owner: true,
            },
            offers: {
              user: true,
            },
            wishlists: {
              owner: true,
              items: true,
            },
          },
          item: { owner: true },
        },
      },
      where: { owner: { id } },
      order: { id: 'DESC' },
    });
  }
  findMany(items: number[]): Promise<Wish[]> {
    return this.wishRepository.findBy({ id: In(items) });
  }
}
