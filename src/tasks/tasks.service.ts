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
  ) {}

  getTasks({ search, status }: GetTasksFilterDto): Promise<Task[]> {
    const query = this.taskRepository.createQueryBuilder('task');

    if (status) {
      query.andWhere(`task.status = :status`, { status });
    }

    if (search) {
      query.andWhere(
        `LOWER(task.description) LIKE :search OR LOWER(task.title) LIKE :search`,
        { search: `%${search.toLocaleLowerCase()}%` }
      );
    }

    return query.getMany();
  }

  async getById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`No task with ID ${id} was found`);
    }

    return found;
  }

  async create({ title, description }: CreateTaskDto): Promise<Task> {
    const task = new Task();

    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;

    return await task.save();
  }

  async updateStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getById(id);
    task.status = status;
    return task.save();
  }

  delete(id: number): void {
    this.taskRepository.delete(id);
  }
}
