import { EmployeeTask } from "../entities/employee-task.entity";
import { EmployeeTaskResponseDTO } from "../dto/employee-taskResponse.dto";

export interface EmployeeTaskRepository {
  create(item: EmployeeTask): Promise<EmployeeTaskResponseDTO>;
  findAll(): Promise<EmployeeTaskResponseDTO[]>;
  findById(id: string): Promise<EmployeeTaskResponseDTO | null>;
  update(id: string, item: Partial<EmployeeTask>): Promise<EmployeeTaskResponseDTO | null>;
}
