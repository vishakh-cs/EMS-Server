import { getMissingRequiredFields } from "../../../../utils/validation";

export interface OrganizationCreateDTO {
  orgUID: string;
  organizationName: string;
  address: string;
  email: string;
  phoneNumber: string;
  website?: string;
  registrationNumber?: string;
  establishedDate?: string;
  industry?: string;
}

export const organizationCreateRequiredFields: Array<keyof OrganizationCreateDTO> = [
  "orgUID",
  "organizationName",
  "address",
  "email",
  "phoneNumber",
];

export const validateFields = (
  organization: Partial<OrganizationCreateDTO>
): string[] =>
  getMissingRequiredFields<OrganizationCreateDTO>(
    organization,
    organizationCreateRequiredFields
  );
