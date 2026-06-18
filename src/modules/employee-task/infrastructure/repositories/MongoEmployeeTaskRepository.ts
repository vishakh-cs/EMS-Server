import { EmployeeTask } from "../../domain/entities/employee-task.entity";
import { EmployeeTaskRepository } from "../../domain/interfaces/employee-task.repository";
import { EmployeeTaskResponseDTO } from "../../domain/dto/employee-taskResponse.dto";
import { toDomain } from "../mapper/employee-task.mapper";
import { EmployeeTaskModel } from "../models/EmployeeTask";

export class MongoEmployeeTaskRepository implements EmployeeTaskRepository {
  async create(item: EmployeeTask): Promise<EmployeeTaskResponseDTO> {
    const createdItem = await EmployeeTaskModel.create(item);
    return toDomain(createdItem);
  }

  async findAll(): Promise<EmployeeTaskResponseDTO[]> {
    const items = await EmployeeTaskModel.find().lean();
    return items.map(toDomain);
  }

  async findById(id: string): Promise<EmployeeTaskResponseDTO | null> {
    const item = await EmployeeTaskModel.findById(id).lean();
    if (!item) return null;
    return toDomain(item);
  }

  async update(id: string, item: Partial<EmployeeTask>): Promise<EmployeeTaskResponseDTO | null> {
    const updatedItem = await EmployeeTaskModel.findByIdAndUpdate(id, item, { returnDocument: "after" }).lean();
    if (!updatedItem) return null;
    return toDomain(updatedItem);
  }
}
