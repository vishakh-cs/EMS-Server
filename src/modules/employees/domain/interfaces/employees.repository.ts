import { Employees } from "../entities/employees.entity";
import { EmployeesResponseDTO } from "../dto/employeesResponse.dto";

export interface EmployeesRepository {
<<<<<<< HEAD
  create(item: Employees): Promise<EmployeesResponseDTO>;
  findAll(): Promise<EmployeesResponseDTO[]>;
  findByEmail(email: string): Promise<Employees>;
=======
  create(item: Omit<Employees, "id">): Promise<EmployeesResponseDTO>;
  findAll(): Promise<EmployeesResponseDTO[]>;
  findByEmail(email: string): Promise<Employees>;
  findByUID(uid: string): Promise<Employees | null>;
>>>>>>> jobfinder
}
