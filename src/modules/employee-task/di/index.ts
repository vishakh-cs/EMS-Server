import EmployeeTaskController from "../presentation/controllers/EmployeeTask.controller";
import { CreateEmployeeTaskUseCase } from "../use_cases/CreateEmployeeTaskUseCase";
import { GetEmployeeTasksUseCase } from "../use_cases/GetEmployeeTasksUseCase";
import { GetEmployeeTaskByIdUseCase } from "../use_cases/GetEmployeeTaskByIdUseCase";
import { UpdateEmployeeTaskUseCase } from "../use_cases/UpdateEmployeeTaskUseCase";
import { MongoEmployeeTaskRepository } from "../infrastructure/repositories/MongoEmployeeTaskRepository";

export const employeeTaskRepository = new MongoEmployeeTaskRepository();
export const createEmployeeTaskUseCase = new CreateEmployeeTaskUseCase(employeeTaskRepository);
export const getEmployeeTasksUseCase = new GetEmployeeTasksUseCase(employeeTaskRepository);
export const getEmployeeTaskByIdUseCase = new GetEmployeeTaskByIdUseCase(employeeTaskRepository);
export const updateEmployeeTaskUseCase = new UpdateEmployeeTaskUseCase(employeeTaskRepository);

export const employeeTaskController = new EmployeeTaskController(
  createEmployeeTaskUseCase,
  getEmployeeTasksUseCase,
  getEmployeeTaskByIdUseCase,
  updateEmployeeTaskUseCase
);
