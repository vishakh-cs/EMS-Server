import { Organization } from "../domain/entities/organization.entity";
import { OrganizationRepository } from "../domain/interfaces/organization.repository";

export class GetOrganizationsUseCase {
  constructor(private readonly organizationRepository: OrganizationRepository) {}

  async execute(): Promise<Organization[]> {
    return this.organizationRepository.findAll();
  }

  async getByEmail(email: string): Promise<Organization | null> {
    return this.organizationRepository.findByEmail(email);
  }
}
