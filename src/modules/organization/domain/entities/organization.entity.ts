export interface Organization {
  id?: string;
  orgUID: string;
  organizationName: string;
  address: string;
  email: string;
  phoneNumber: string;
  website?: string;
  registrationNumber?: string;
  establishedDate?: string;
  industry?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
