import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filters: GetTasksFilterDto): Task[] {
    if (Object.keys(filters).length) {
      return this.tasksService.getWithFilters(filters);
    }
    return this.tasksService.getAll();
  }

  @Get(':id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.create(createTaskDto);
  }

  @Patch(':id/status')
  updateTaskStatus(@Param('id') id: string, @Body('status') status): Task {
    return this.tasksService.updateStatus(id, status);
  }

  @Delete(':id')
  deleteTask(@Param('id') id): void {
    this.tasksService.delete(id);
  }
}
