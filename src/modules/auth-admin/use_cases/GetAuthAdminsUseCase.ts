import { AuthAdmin } from "../domain/entities/auth-admin.entity";
import { AuthAdminRepository } from "../domain/interfaces/auth-admin.repository";

export class GetAuthAdminsUseCase {
  constructor(private readonly repository: AuthAdminRepository) {}

  async execute(): Promise<AuthAdmin[]> {
    return this.repository.findAll();
  }
}
