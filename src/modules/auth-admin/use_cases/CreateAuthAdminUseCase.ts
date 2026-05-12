import { AuthAdmin } from "../domain/entities/auth-admin.entity";
import { AuthAdminCreateDTO } from "../domain/dto/auth-adminCreate.dto";
import { AuthAdminRepository } from "../domain/interfaces/auth-admin.repository";
import { AuthAdminResponseDTO } from "../domain/dto/auth-adminResponse.dto";

export class CreateAuthAdminUseCase {
  constructor(private readonly repository: AuthAdminRepository) {}

  async execute(dto: AuthAdminCreateDTO): Promise<AuthAdminResponseDTO> {
    return this.repository.create(dto);
  }
}
