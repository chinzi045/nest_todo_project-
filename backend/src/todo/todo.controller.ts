import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiSecurity } from '@nestjs/swagger';

@ApiTags('Todo')
@Controller('todo')
@ApiSecurity('JWT-auth')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post(':userId')
  create(
    @Body() createTodoDto: CreateTodoDto,
    @Param('userId') userId: number,
  ) {
    console.log(typeof userId);
    return this.todoService.create(createTodoDto, Number(userId));
  }

  @Get('/findalltodosUncompletes/:userId')
  findAll(@Param('userId') userID: number) {
    return this.todoService.findAll(Number(userID));
  }

  @Get('/findalltodos/:userId')
  findAllCompleted(@Param('userId') userId: number) {
    return this.todoService.findAllcompleted(Number(userId));
  }

  @Put(':id')
  update(@Param('id') id: number) {
    return this.todoService.updateStatusTodo(Number(id));
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.todoService.remove(Number(id));
  }
}
