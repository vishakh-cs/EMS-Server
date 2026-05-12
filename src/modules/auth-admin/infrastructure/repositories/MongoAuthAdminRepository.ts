import { AuthAdminLoginDTO } from "../../domain/dto/auth-adminLogin.dto";
import { AuthAdmin } from "../../domain/entities/auth-admin.entity";
import { AuthAdminRepository } from "../../domain/interfaces/auth-admin.repository";
import bcrypt from "bcrypt";
import AuthAdminModel from "../models/AuthAdmin";
import { toDomain } from "../mapper/auth-admin.mapper";
import { AuthAdminResponseDTO } from "../../domain/dto/auth-adminResponse.dto";

export class MongoAuthAdminRepository implements AuthAdminRepository {
  async create(item: AuthAdmin): Promise<AuthAdminResponseDTO> {
    const hashedPassword = await bcrypt.hash(item.password, 10);
    const createdUser = await AuthAdminModel.create({
      ...item,
      password: hashedPassword,
    });
    return toDomain(createdUser.toObject());
  }

  async findAll(): Promise<AuthAdmin[]> {
    return [];
  }

  async login(dto: AuthAdminLoginDTO): Promise<AuthAdminResponseDTO> {
    if (!dto.email || !dto.password) {
      throw new Error("Email and password are required");
    }
    const user = await AuthAdminModel.findOne({ email: dto.email });
    if (!user) {
      throw new Error("User not found");
    }
     const hashedPassword = bcrypt.compare(dto.password, user.password);
     if(!hashedPassword){
        throw new Error("Invalid credentials");
     }
     return toDomain(user.toObject());
  }
}
