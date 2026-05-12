import { AuthAdminResponseDTO } from "../../domain/dto/auth-adminResponse.dto";
import { AuthAdmin } from "../../domain/entities/auth-admin.entity";


export const toDomain = (data: Omit<AuthAdmin, "password">):AuthAdminResponseDTO => {
  return {
    id: data._id?.toString()!,
    name: data.name,
    email: data.email,
    createdAt: data.createdAt ? data.createdAt : new Date(),
    updatedAt: data.updatedAt ? data.updatedAt : new Date(),
  };
};