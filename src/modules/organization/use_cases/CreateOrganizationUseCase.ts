import { Organization } from "../domain/entities/organization.entity";
import { OrganizationCreateDTO } from "../domain/interfaces/organizationCreate.dto";
import { OrganizationRepository } from "../domain/interfaces/organization.repository";

export class CreateOrganizationUseCase {
  constructor(private readonly organizationRepository: OrganizationRepository) {}

  async execute(organization: OrganizationCreateDTO): Promise<Organization> {
    return this.organizationRepository.create({
      orgUID: organization.orgUID,
      organizationName: organization.organizationName,
      address: organization.address,
      email: organization.email,
      phoneNumber: organization.phoneNumber,
      website: organization.website,
      registrationNumber: organization.registrationNumber,
      establishedDate: organization.establishedDate,
      industry: organization.industry,
    });
  }
}
