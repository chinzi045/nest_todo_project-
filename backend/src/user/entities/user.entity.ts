import { Exclude } from 'class-transformer';
import { Todo } from 'src/todo/entities/todo.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  //   @Exclude({ toPlainOnly: true })
  password: string;

  @Column()
  email: string;

  @Column()
  role: string;

  // relation ......single user have many todos
  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];
}
