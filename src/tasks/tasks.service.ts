import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './models/task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskRepository } from './repositories/task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {

  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository
  ){}
  // getAll(): Task[] {
  //   return this.tasks;
  // }

  // getWithFilters({ search, status }: GetTasksFilterDto): Task[] {
  //   let tasks = this.getAll();

  //   if (status) {
  //     tasks = tasks.filter(task => task.status === status);
  //   }

  //   if (search) {
  //     tasks = tasks.filter(
  //       ({ title, description }) =>
  //         title.includes(search) || description.includes(search)
  //     );
  //   }

  //   return tasks;
  // }

  async getById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);
    
    if (!found) {
      throw new NotFoundException(`No task with ID ${id} was found`);
    }

    return found;
  }

  // create({ title, description }: CreateTaskDto): Task {
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };

  //   this.tasks.push(task);
  //   return task;
  // }

  // updateStatus(id: string, status: TaskStatus): Task {
  //   const task = this.getById(id);
  //   task.status = status;
  //   return task;
  // }

  // delete(id: string): void {
  //   const found = this.getById(id);
  //   const taskId = this.tasks.findIndex(task => task.id === found.id);
  //   this.tasks.splice(taskId, 1);
  // }
}
