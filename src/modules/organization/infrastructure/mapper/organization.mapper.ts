import { OrganizationResponseDTO } from "../../domain/dto/organizationResponse.dto";
import { Organization } from "../../domain/entities/organization.entity";

export const toDomain = (data: any): OrganizationResponseDTO => {
  return {
    id: data._id?.toString() || data.id,
    name: data.name,
    createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
    updatedAt: data.updatedAt ? new Date(data.updatedAt) : new Date(),
  };
};
