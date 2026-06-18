import { Organization } from "../entities/organization.entity";

export interface OrganizationRepository {
  create(organization: Organization): Promise<Organization>;
  findAll(): Promise<Organization[]>;
<<<<<<< HEAD
=======
  findByEmail(email: string): Promise<Organization | null>;
>>>>>>> jobfinder
}
