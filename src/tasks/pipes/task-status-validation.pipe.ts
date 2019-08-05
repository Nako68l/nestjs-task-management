import { PipeTransform, BadRequestException } from '@nestjs/common';
import { TaskStatus } from '../models/task.model';
import { isString } from 'util';

export class TaskStatusValidationPipe implements PipeTransform {
  transform(value: any): TaskStatus {
    if (isString(value)) {
      value = value.trim().toUpperCase();
    }

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is not valid status`);
    }

    return value;
  }

  private isStatusValid(status: any): boolean {
    const statuses = Object.values(TaskStatus);
    return statuses.includes(status);
  }
}
