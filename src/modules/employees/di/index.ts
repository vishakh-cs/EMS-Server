import EmployeesController from "../presentation/controllers/Employees.controller";
import { CreateEmployeesUseCase } from "../use_cases/CreateEmployeesUseCase";
import { GetEmployeessUseCase } from "../use_cases/GetEmployeessUseCase";
import { MongoEmployeesRepository } from "../infrastructure/repositories/MongoEmployeesRepository";
import { LoginEmployeeUseCase } from "../use_cases/LoginEmployeeUseCase";

export const employeesRepository = new MongoEmployeesRepository();
export const createEmployeesUseCase = new CreateEmployeesUseCase(employeesRepository);
export const getEmployeessUseCase = new GetEmployeessUseCase(employeesRepository);
export const loginEmployeeUseCase = new LoginEmployeeUseCase(employeesRepository);

export const employeesController = new EmployeesController(
  createEmployeesUseCase,
  getEmployeessUseCase,
  loginEmployeeUseCase
);
