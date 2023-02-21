import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { Length } from 'class-validator';
import { User } from './User';
import { Wish } from './Wish';

// Cхема списка подарков
@Entity()
export class Wishlist {
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
  @Length(1, 1500)
  description: string;
  @Column()
  image: string;
  // !! набор ссылок на подарки. односторонняя связь
  @ManyToMany(() => Wish)
  @JoinTable()
  items: Wish[];
  // дополнительная связь для созданных пользователем вишлистов
  @ManyToOne(() => User, (user) => user.wishes)
  owner: User;
}
