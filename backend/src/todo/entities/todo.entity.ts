import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('todos')
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  date: string;

  @Column()
  completed: boolean;

  // realtion many todos belongs to single User

  @ManyToOne(() => User, (user) => user.todos, {
    onDelete: 'CASCADE',
  })
  user: User;
}
