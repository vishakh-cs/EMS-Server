import { AuthAdminLoginDTO } from "../domain/dto/auth-adminLogin.dto";
import { AuthAdminResponseDTO } from "../domain/dto/auth-adminResponse.dto";
import { AuthAdmin } from "../domain/entities/auth-admin.entity";
import { AuthAdminRepository } from "../domain/interfaces/auth-admin.repository";

export class LoginAdminUseCase {
  constructor(private readonly repository: AuthAdminRepository) {}

  async execute(dto: AuthAdminLoginDTO): Promise<AuthAdminResponseDTO> {
    return this.repository.login(dto);
  } 
}