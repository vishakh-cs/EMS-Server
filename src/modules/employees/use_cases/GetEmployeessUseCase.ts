<<<<<<< HEAD
=======
import { EmployeeProfileResponseDTO } from "../domain/dto/employeeProfileResponse.dto";
>>>>>>> jobfinder
import { EmployeesResponseDTO } from "../domain/dto/employeesResponse.dto";
import { EmployeesRepository } from "../domain/interfaces/employees.repository";

export class GetEmployeessUseCase {
  constructor(private readonly repository: EmployeesRepository) {}

  async execute(): Promise<EmployeesResponseDTO[]> {
    return this.repository.findAll();
  }
<<<<<<< HEAD
=======

  async getProfile(email: string): Promise<EmployeeProfileResponseDTO> {
    const employee = await this.repository.findByEmail(email);
    
    const employeeProfile: EmployeeProfileResponseDTO = {
      id: employee.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      role: employee.role,
      organizationUID: employee.organizationId,
      country: employee.country,
      state: employee.state,
      city: employee.city,
      address: employee.address,
      zipCode: employee.zipCode,
      phoneNumber: employee.phoneNumber,
      profileImage: employee.profileImage,
      emergencyContactName: employee.emergencyContactName,
      emergencyContactPhone: employee.emergencyContactPhone,
      joiningDate: employee.joiningDate,
      employmentType: employee.employmentType,
      status: employee.status,
      };
    return employeeProfile;
  }
>>>>>>> jobfinder
}
