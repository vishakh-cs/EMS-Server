import { AuthAdminLoginDTO } from "../dto/auth-adminLogin.dto";
import { AuthAdminResponseDTO } from "../dto/auth-adminResponse.dto";
import { AuthAdmin } from "../entities/auth-admin.entity";

export interface AuthAdminRepository {
  create(item: AuthAdmin): Promise<AuthAdminResponseDTO>;
  findAll(): Promise<AuthAdmin[]>;
  login(dto: AuthAdminLoginDTO): Promise<AuthAdminResponseDTO>;
}
