import { EmployeeRole, EmployeeStatus, EmploymentType } from "../../../../shared/enums/employee.enum";

export interface EmployeesResponseDTO {
  id: string;
  employeeUID: string;
  firstName: string;
  lastName?: string;
  email: string;
  phoneNumber: string;
  organizationId: string;
  department?: string;
  designation?: string;
  joiningDate?: Date;
  employmentType?: EmploymentType;
  role: EmployeeRole;
  status: EmployeeStatus;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode?: string;
  profileImage?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  createdAt: Date;
  updatedAt: Date;
  token?: string;
  refreshToken?: string;
}
