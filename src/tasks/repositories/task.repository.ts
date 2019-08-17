import { Repository, EntityRepository } from "typeorm";
import { TaskEntity } from "../entities/task.entity";

@EntityRepository(TaskEntity)
export class TaskRepository extends Repository<TaskEntity> {
}