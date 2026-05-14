import { EmployeesResponseDTO } from "../../domain/dto/employeesResponse.dto";

export const toDomain = (data: any): EmployeesResponseDTO => {
  return {
    id: data._id?.toString() || data.id,
    employeeUID: data.employeeUID,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phoneNumber: data.phoneNumber,
    organizationId: data.organizationId,
    department: data.department,
    designation: data.designation,
    joiningDate: data.joiningDate,
    employmentType: data.employmentType,
    role: data.role,
    status: data.status,
    address: data.address,
    city: data.city,
    state: data.state,
    country: data.country,
    zipCode: data.zipCode,
    profileImage: data.profileImage,
    emergencyContactName: data.emergencyContactName,
    emergencyContactPhone: data.emergencyContactPhone,
    createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
    updatedAt: data.updatedAt ? new Date(data.updatedAt) : new Date(),
  };
};
