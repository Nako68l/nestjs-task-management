import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";
import { TaskStatus } from "../models/task.model";

@Entity()
export class TaskEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TaskStatus;
}