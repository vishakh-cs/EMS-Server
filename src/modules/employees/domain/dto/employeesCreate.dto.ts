import { EmployeeRole, EmployeeStatus, EmploymentType } from "../../../../shared/enums/employee.enum";

export interface EmployeesCreateDTO {
  employeeUID: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
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
}
