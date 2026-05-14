import { Request, Response } from "express";
import { EmployeesCreateDTO } from "../../domain/dto/employeesCreate.dto";
import { CreateEmployeesUseCase } from "../../use_cases/CreateEmployeesUseCase";
import { GetEmployeessUseCase } from "../../use_cases/GetEmployeessUseCase";
import { EmployeeLoginDTO } from "../../domain/dto/employeeLogin.dto";
import { LoginEmployeeUseCase } from "../../use_cases/LoginEmployeeUseCase";

export default class EmployeesController {
  constructor(
    private readonly createEmployeesUseCase: CreateEmployeesUseCase,
    private readonly getEmployeessUseCase: GetEmployeessUseCase,
    private readonly loginEmployeesUseCase: LoginEmployeeUseCase
  ) { }

  async getAll(req: Request, res: Response): Promise<Response> {
    const items = await this.getEmployeessUseCase.execute();
    return res.json({ message: "Get all employees", data: items });
  }

  async create(req: Request, res: Response): Promise<Response> {
    const dto: EmployeesCreateDTO = req.body;
    const item = await this.createEmployeesUseCase.execute(dto);

    return res.status(201).json({
      message: "Employees created successfully",
      data: item,
    });
  }

  async login(req: Request, res: Response): Promise<Response> {
    const dto: EmployeeLoginDTO = req.body;
    const user = await this.loginEmployeesUseCase.execute(dto);

    if (!user) {
      throw new Error("User not found");
    }

    return res.status(201).json({
      message: "Employees logged in successfully",
      data: user,
    });
  }
}
