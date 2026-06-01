import { TaskPriority } from "../../../../shared/enums/task.enum";

export interface EmployeeTaskCreateDTO {
  organizationId: string;
  title: string;
  description: string;
  assigneeId: string;
  assignerId: string;
  priority: TaskPriority;
  dueDate: Date;
}
