import { Employees } from "../../domain/entities/employees.entity";
import { EmployeesRepository } from "../../domain/interfaces/employees.repository";
import { EmployeesResponseDTO } from "../../domain/dto/employeesResponse.dto";
import { toDomain } from "../mapper/employees.mapper";
import EmployeeModel from "../models/Employees";
import { EmployeeLoginDTO } from "../../domain/dto/employeeLogin.dto";
import bcrypt from "bcrypt";

export class MongoEmployeesRepository implements EmployeesRepository {
  async create(item: Employees): Promise<EmployeesResponseDTO> {
     const createdItem = await EmployeeModel.create(item);
     return toDomain(createdItem);
  }

  async findAll(): Promise<EmployeesResponseDTO[]> {
    const items = await EmployeeModel.find();
    return items.map(toDomain);
  }

  async findByEmail(email: string): Promise<Employees> {
    const employee = await EmployeeModel.findOne({ email }).lean();
    if (!employee) {
      throw new Error("Invalid credentials");
    }
    return {
      ...(employee as any),
      id: employee._id.toString(),
    };
  }

}
