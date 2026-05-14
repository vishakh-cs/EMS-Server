import { Organization } from "../domain/entities/organization.entity";
import { OrganizationRepository } from "../domain/interfaces/organization.repository";
import { CreateEmployeesUseCase } from "../../employees/use_cases/CreateEmployeesUseCase";
import { EmployeeRole, EmployeeStatus } from "../../../shared/enums/employee.enum";
import crypto from "crypto";
import { OrganizationCreateDTO, validateFields } from "../domain/dto/organizationCreate.dto";
import { sendMail } from "../../../utils/mailer";

export class CreateOrganizationUseCase {
  constructor(
    private readonly organizationRepository: OrganizationRepository,
    private readonly createEmployeesUseCase: CreateEmployeesUseCase
  ) {}

  async execute(organization: OrganizationCreateDTO): Promise<Organization> {
    const missingFields = validateFields(organization);

    if (missingFields.length > 0) {
      const error: any = new Error("Missing required organization fields");
      error.status = 400;
      error.fields = missingFields;
      throw error;
    }

    const createdOrganization = await this.organizationRepository.create({
      orgUID: organization.orgUID,
      organizationName: organization.organizationName,
      address: organization.address,
      email: organization.email,
      phoneNumber: organization.phoneNumber,
      website: organization.website,
      registrationNumber: organization.registrationNumber,
      establishedDate: organization.establishedDate,
      industry: organization.industry,
    });

    const adminEmail = organization.email;
    const adminPassword = crypto.randomBytes(6).toString("hex");

    // Log the credentials for development/testing since email might not be configured
    console.log(`\n=========================================`);
    console.log(`Admin created for organization: ${organization.organizationName}`);
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);
    console.log(`=========================================\n`);

    await this.createEmployeesUseCase.execute({
      employeeUID: crypto.randomUUID(),
      firstName: "Admin",
      lastName: "User",
      email: adminEmail,
      password: adminPassword,
      phoneNumber: organization.phoneNumber,
      organizationId: organization.orgUID,
      role: EmployeeRole.ADMIN,
      status: EmployeeStatus.ACTIVE,
      address: organization.address,
      city: "N/A",
      state: "N/A",
      country: "N/A",
    });

    const subject = `Welcome to ${organization.organizationName}!`;
    const text = `Hello Admin,\n\nYour organization has been successfully created.\n\nHere are your admin credentials:\nEmail: ${adminEmail}\nPassword: ${adminPassword}\n\nPlease login and change your password immediately.`;
    const html = `
      <h2>Welcome to ${organization.organizationName}!</h2>
      <p>Your organization has been successfully created.</p>
      <p>Here are your admin credentials:</p>
      <ul>
        <li><strong>Email:</strong> ${adminEmail}</li>
        <li><strong>Password:</strong> ${adminPassword}</li>
      </ul>
      <p>Please login and change your password immediately.</p>
    `;

    await sendMail(adminEmail, subject, text, html);

    return createdOrganization;
  }
}
