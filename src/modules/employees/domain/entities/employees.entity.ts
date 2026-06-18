import { EmployeeRole, EmployeeStatus, EmploymentType } from "../../../../shared/enums/employee.enum";


export interface Employees {
<<<<<<< HEAD
  id?: string;
=======
  id: string;
>>>>>>> jobfinder

  employeeUID: string;
  firstName: string;
  lastName?: string;

  email: string;
  phoneNumber: string;


  password: string;


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

  createdAt?: Date;
  updatedAt?: Date;
}