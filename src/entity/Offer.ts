import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './User';
import { Wish } from './Wish';
import { IsNumber } from 'class-validator';

// Схема желающих скинуться
@Entity()
export class Offer {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;

  // id пользователя желающего скинуться
  @ManyToOne(() => User, (user) => user.offers)
  user: User;
  // ссылка на желание
  @ManyToOne(() => Wish, (wish) => wish.offers)
  item: Wish;
  // сумма заявки
  @Column({
    scale: 2,
    default: 0,
  })
  @IsNumber()
  amount: number;
  @Column('boolean', { default: false }) // показывать ли информацию о скидывающемся в списке
  hidden: false;
  @IsNumber()
  itemId: number;
}
