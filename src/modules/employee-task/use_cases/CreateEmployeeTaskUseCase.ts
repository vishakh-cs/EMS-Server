import { EmployeeTaskCreateDTO } from "../domain/dto/employee-taskCreate.dto";
import { EmployeeTaskResponseDTO } from "../domain/dto/employee-taskResponse.dto";
import { EmployeeTaskRepository } from "../domain/interfaces/employee-task.repository";
import { TaskStatus } from "../../../shared/enums/task.enum";

export class CreateEmployeeTaskUseCase {
  constructor(private readonly repository: EmployeeTaskRepository) {}

  async execute(dto: EmployeeTaskCreateDTO): Promise<EmployeeTaskResponseDTO> {
    return this.repository.create({
      organizationId: dto.organizationId,
      title: dto.title,
      description: dto.description,
      assigneeId: dto.assigneeId,
      assignerId: dto.assignerId,
      priority: dto.priority,
      dueDate: dto.dueDate,
      status: TaskStatus.PENDING,
    });
  }
}
