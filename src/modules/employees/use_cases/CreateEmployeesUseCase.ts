import { EmployeesCreateDTO } from "../domain/dto/employeesCreate.dto";
import { EmployeesResponseDTO } from "../domain/dto/employeesResponse.dto";
import { EmployeesRepository } from "../domain/interfaces/employees.repository";
import bcrypt from "bcrypt";

export class CreateEmployeesUseCase {
  constructor(private readonly repository: EmployeesRepository) { }

  async execute(dto: EmployeesCreateDTO): Promise<EmployeesResponseDTO> {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const employee = await this.repository.create({ ...dto, password: hashedPassword });

    return employee;
  }
}
