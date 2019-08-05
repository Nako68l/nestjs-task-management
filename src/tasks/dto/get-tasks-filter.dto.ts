import { TaskStatus } from '../models/task.model';
import { IsNotEmpty, IsOptional, IsIn } from 'class-validator';

export class GetTasksFilterDto {
  @IsOptional()
  @IsNotEmpty()
  search: string;

  @IsOptional()
  @IsIn(Object.values(TaskStatus))
  status: TaskStatus;
}
