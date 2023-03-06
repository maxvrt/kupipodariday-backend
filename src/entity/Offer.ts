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
  // ссылка на товар
  @ManyToOne(() => Wish, (wish) => wish.offers)
  item: Wish;
  // сумма заявки
  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;
  @Column('boolean', { default: false }) // показывать ли информацию о скидывающемся в списке
  hidden: false;
}
