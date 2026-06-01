import { EmployeeTaskResponseDTO } from "../../domain/dto/employee-taskResponse.dto";

export const toDomain = (data: any): EmployeeTaskResponseDTO => {
  return {
    id: data._id?.toString() || data.id,
    organizationId: data.organizationId,
    title: data.title,
    description: data.description,
    assigneeId: data.assigneeId,
    assignerId: data.assignerId,
    status: data.status,
    priority: data.priority,
    dueDate: data.dueDate ? new Date(data.dueDate) : new Date(),
    completedAt: data.completedAt ? new Date(data.completedAt) : undefined,
    createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
    updatedAt: data.updatedAt ? new Date(data.updatedAt) : new Date(),
  };
};
