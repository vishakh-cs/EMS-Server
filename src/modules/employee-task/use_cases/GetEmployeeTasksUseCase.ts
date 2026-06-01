import { EmployeeTaskResponseDTO } from "../domain/dto/employee-taskResponse.dto";
import { EmployeeTaskRepository } from "../domain/interfaces/employee-task.repository";

export class GetEmployeeTasksUseCase {
  constructor(private readonly repository: EmployeeTaskRepository) {}

  async execute(): Promise<EmployeeTaskResponseDTO[]> {
    return this.repository.findAll();
  }
}
