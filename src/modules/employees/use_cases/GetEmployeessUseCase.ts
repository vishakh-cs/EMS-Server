import { EmployeesResponseDTO } from "../domain/dto/employeesResponse.dto";
import { EmployeesRepository } from "../domain/interfaces/employees.repository";

export class GetEmployeessUseCase {
  constructor(private readonly repository: EmployeesRepository) {}

  async execute(): Promise<EmployeesResponseDTO[]> {
    return this.repository.findAll();
  }
}
