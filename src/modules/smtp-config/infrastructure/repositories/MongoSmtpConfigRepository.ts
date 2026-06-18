import { SmtpConfig } from "../../domain/entities/smtp-config.entity";
import { SmtpConfigRepository } from "../../domain/interfaces/smtp-config.repository";
import { SmtpConfigResponseDTO } from "../../domain/dto/smtp-configResponse.dto";
import { toDomain } from "../mapper/smtp-config.mapper";
import { SmtpConfigInputDto } from "../../domain/dto/smtp-configCreate.dto";
import SmtpConfigModel from "../models/SmtpConfig";

export class MongoSmtpConfigRepository implements SmtpConfigRepository {
  async create(item: SmtpConfig): Promise<SmtpConfigResponseDTO> {
    // Implement database creation logic
    // const createdItem = await Model.create(item);
    // return toDomain(createdItem);
    return toDomain({ ...item, _id: "dummy-id" });
  }

  async findAll(): Promise<SmtpConfigResponseDTO[]> {
    // Implement database fetch logic
    // const items = await Model.find();
    // return items.map(toDomain);
    return [];
  }

  async createSmtpConfig(dto: SmtpConfigInputDto): Promise<SmtpConfigResponseDTO> {
    const employeeId=dto.employeeId;

    const smtpConfig=await SmtpConfigModel.findOne({employeeId:employeeId});

    if(smtpConfig){
      throw new Error("SmtpConfig already exists");
    }
    const response = await SmtpConfigModel.create(dto);
    return toDomain(response);
  }

  async getSmtpConfig(email: string): Promise<SmtpConfigResponseDTO> {
    const response = await SmtpConfigModel.findOne({email:email});
    if (!response) {
      throw new Error("SmtpConfig not found");
    }
    return toDomain(response);
  }
}
