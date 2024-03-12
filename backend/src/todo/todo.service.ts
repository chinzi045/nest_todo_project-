import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
// import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private readonly todoservice: Repository<Todo>,
    private readonly userService: UserService,
  ) {}
  async create(createTodoDto: CreateTodoDto, userId: number) {
    const todo = new Todo();
    todo.title = createTodoDto.title;
    todo.date = new Date().toLocaleString();
    todo.completed = false;
    todo.user = await this.userService.FindOnebyid(userId);

    const data = await this.todoservice.save(todo);

    return {
      data: data,
      messsage: 'Successfully created!',
    };
  }

  findAll(userId: number) {
    return this.todoservice.find({
      relations: ['user'],
      where: { user: { id: userId }, completed: false },
    });

    // return `This action returns all todo`;
  }

  findAllcompleted(userId: number) {
    return this.todoservice.find({
      relations: ['user'],
      where: { user: { id: userId }, completed: true },
    });
  }

  updateStatusTodo(todoId: number) {
    return this.todoservice.update(todoId, { completed: true });
  }

  remove(todoId: number) {
    return this.todoservice.delete(todoId);
  }
}
