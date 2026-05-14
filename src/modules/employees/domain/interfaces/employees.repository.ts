import { Employees } from "../entities/employees.entity";
import { EmployeesResponseDTO } from "../dto/employeesResponse.dto";

export interface EmployeesRepository {
  create(item: Employees): Promise<EmployeesResponseDTO>;
  findAll(): Promise<EmployeesResponseDTO[]>;
  findByEmail(email: string): Promise<Employees>;
}
