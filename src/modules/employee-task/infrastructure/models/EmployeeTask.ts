import mongoose, { Schema, Document } from "mongoose";
import { EmployeeTask } from "../../domain/entities/employee-task.entity";
import { TaskStatus, TaskPriority } from "../../../../shared/enums/task.enum";

export interface EmployeeTaskDocument extends Omit<EmployeeTask, 'id'>, Document {}

const EmployeeTaskSchema: Schema = new Schema(
  {
    organizationId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    assigneeId: { type: String, required: true },
    assignerId: { type: String, required: true },
    status: { type: String, enum: Object.values(TaskStatus), default: TaskStatus.PENDING },
    priority: { type: String, enum: Object.values(TaskPriority), default: TaskPriority.MEDIUM },
    dueDate: { type: Date, required: true },
    completedAt: { type: Date }
  },
  { timestamps: true }
);

export const EmployeeTaskModel = mongoose.model<EmployeeTaskDocument>("EmployeeTask", EmployeeTaskSchema);
