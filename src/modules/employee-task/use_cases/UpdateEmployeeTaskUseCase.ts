import { EmployeeTaskResponseDTO } from "../domain/dto/employee-taskResponse.dto";
import { EmployeeTaskRepository } from "../domain/interfaces/employee-task.repository";
import { EmployeeTask } from "../domain/entities/employee-task.entity";

export class UpdateEmployeeTaskUseCase {
  constructor(private readonly repository: EmployeeTaskRepository) {}

  async execute(id: string, updateData: Partial<EmployeeTask>): Promise<EmployeeTaskResponseDTO | null> {
    return this.repository.update(id, updateData);
  }
}
