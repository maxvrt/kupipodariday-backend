import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Length, IsUrl } from 'class-validator';
import { User } from './User';
import { Offer } from './Offer';

// Схема для подарков
@Entity()
export class Wish {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  @Length(1, 250)
  name: string;
  @Column()
  link: string;
  @Column()
  @IsUrl()
  image: string;
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;
  // сколько сейчас готовы скинуть на подарок
  @Column('decimal', { precision: 10, scale: 2 })
  raised: number;
  // user который добавил пожелание подарка
  @ManyToOne(() => User, (user) => user.wishes)
  owner: User;
  @Column()
  @Length(1, 1024)
  description: string;
  // массив ссылок на заявки скинуться от других пользователей
  @OneToMany(() => Offer, (offer) => offer.item)
  offers: Offer[];
  @Column() // cчётчик тех, кто скопировал подарок себе
  copied: number;
}
