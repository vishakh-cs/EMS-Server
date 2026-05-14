import bcrypt from "bcrypt";
import { EmployeeLoginDTO } from "../domain/dto/employeeLogin.dto";
import { EmployeesResponseDTO } from "../domain/dto/employeesResponse.dto";
import { EmployeesRepository } from "../domain/interfaces/employees.repository";
import { toDomain } from "../infrastructure/mapper/employees.mapper";
import { generateAccessToken, generateRefreshToken } from "../../../shared/jwt";

export class LoginEmployeeUseCase {
    constructor(
        private readonly repository: EmployeesRepository
    ) { }

    async execute(
        dto: EmployeeLoginDTO
    ): Promise<EmployeesResponseDTO> {

        const employee = await this.repository.findByEmail(dto.email);

        if (!employee) {
            throw new Error("Invalid credentials");
        }

        const isPasswordValid = await bcrypt.compare(dto.password, employee.password);

        if (!isPasswordValid) {
            throw new Error("Invalid credentials");
        }

        const tokenPayload = {
            id: employee.id!,
            email: employee.email,
            role: employee.role,
        }

        const token = generateAccessToken(tokenPayload);
        const refreshToken = generateRefreshToken(tokenPayload);

        return {
            ...toDomain(employee),
            token,
            refreshToken
        };
    }
}