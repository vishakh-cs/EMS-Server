export interface EmployeeProfileResponseDTO {
    id: string;
    firstName: string;
    lastName?: string;
    email: string;
    role: string;
    organizationUID: string;
    country?: string;
    state?: string;
    city?: string;
    address?: string;
    zipCode?: string;
    phoneNumber?: string;
    profileImage?: string;
    emergencyContactName?: string;
    emergencyContactPhone?: string;
    joiningDate?: Date;
    employmentType?: string;
    status: string;
}