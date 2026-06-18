import { TaskStatus, TaskPriority } from "../../../../shared/enums/task.enum";

export interface EmployeeTask {
  id?: string;
  organizationId: string;
  title: string;
  description: string;
  assigneeId: string;
  assignerId: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: Date;
  completedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
