import { Request, Response } from "express";
import { EmployeeTaskCreateDTO } from "../../domain/dto/employee-taskCreate.dto";
import { CreateEmployeeTaskUseCase } from "../../use_cases/CreateEmployeeTaskUseCase";
import { GetEmployeeTasksUseCase } from "../../use_cases/GetEmployeeTasksUseCase";
import { GetEmployeeTaskByIdUseCase } from "../../use_cases/GetEmployeeTaskByIdUseCase";
import { UpdateEmployeeTaskUseCase } from "../../use_cases/UpdateEmployeeTaskUseCase";

export default class EmployeeTaskController {
  constructor(
    private readonly createEmployeeTaskUseCase: CreateEmployeeTaskUseCase,
    private readonly getEmployeeTasksUseCase: GetEmployeeTasksUseCase,
    private readonly getEmployeeTaskByIdUseCase: GetEmployeeTaskByIdUseCase,
    private readonly updateEmployeeTaskUseCase: UpdateEmployeeTaskUseCase
  ) {}

  async getAll(req: Request, res: Response): Promise<Response> {
    const items = await this.getEmployeeTasksUseCase.execute();
    return res.json({ message: "Get all employee tasks", data: items });
  }

  async getById(req: Request, res: Response): Promise<Response> {
    const id = req.params.id as string;
    const item = await this.getEmployeeTaskByIdUseCase.execute(id);
    if (!item) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.json({ message: "Get employee task by id", data: item });
  }

  async create(req: Request, res: Response): Promise<Response> {
    const dto: EmployeeTaskCreateDTO = req.body;
    const item = await this.createEmployeeTaskUseCase.execute(dto);

    return res.status(201).json({
      message: "EmployeeTask created successfully",
      data: item,
    });
  }

  async update(req: Request, res: Response): Promise<Response> {
    const id = req.params.id as string;
    const updateData = req.body;
    const item = await this.updateEmployeeTaskUseCase.execute(id, updateData);
    
    if (!item) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.json({
      message: "EmployeeTask updated successfully",
      data: item,
    });
  }
}
