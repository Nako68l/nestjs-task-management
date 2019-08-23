import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { TaskStatus } from '../models/task-status.enum';

/**
 * @TODO: think about refactor to constructor accepting params object for initialization
 * and set @property {TaskStatus} status to OPEN by default
 */
@Entity()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;
}
