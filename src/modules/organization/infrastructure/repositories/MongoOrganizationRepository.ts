import { Organization } from "../../domain/entities/organization.entity";
import { OrganizationRepository } from "../../domain/interfaces/organization.repository";
import OrganizationModel from "../models/Organization";

const toDomain = (organization: Organization & { _id?: unknown }): Organization => ({
  id: organization._id?.toString(),
  orgUID: organization.orgUID,
  organizationName: organization.organizationName,
  address: organization.address,
  email: organization.email,
  phoneNumber: organization.phoneNumber,
  website: organization.website,
  registrationNumber: organization.registrationNumber,
  establishedDate: organization.establishedDate,
  industry: organization.industry,
  createdAt: organization.createdAt,
  updatedAt: organization.updatedAt,
});

export class MongoOrganizationRepository implements OrganizationRepository {
  async create(organization: Organization): Promise<Organization> {
    const uid = organization.orgUID
    const existingOrg = await OrganizationModel.findOne({ orgUID: uid });
    if (existingOrg) {
      throw new Error("Organization with this UID already exists");
    }
    const createdOrganization = await OrganizationModel.create(organization);

    return toDomain(createdOrganization.toObject());
  }

  async findAll(): Promise<Organization[]> {
    const organizations = await OrganizationModel.find().sort({ createdAt: -1 }).lean();

    return organizations.map(toDomain);
  }

  async findByEmail(email: string): Promise<Organization> {
    const organization = await OrganizationModel.findOne({ email });
    if (!organization) {
      throw new Error("Organization not found");
    }
    return toDomain(organization);
  }

}
