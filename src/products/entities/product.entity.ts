import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column('decimal')
  price: number;

  @Column({ nullable: true })
  quantity: number | null;

  @Column({ default: false })
  approved: boolean;

  @ManyToOne(() => User, (user) => user.products)
  owner: User;
}
