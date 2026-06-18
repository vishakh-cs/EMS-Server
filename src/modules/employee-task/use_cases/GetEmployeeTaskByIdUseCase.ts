import { EmployeeTaskResponseDTO } from "../domain/dto/employee-taskResponse.dto";
import { EmployeeTaskRepository } from "../domain/interfaces/employee-task.repository";

export class GetEmployeeTaskByIdUseCase {
  constructor(private readonly repository: EmployeeTaskRepository) {}

  async execute(id: string): Promise<EmployeeTaskResponseDTO | null> {
    return this.repository.findById(id);
  }
}
