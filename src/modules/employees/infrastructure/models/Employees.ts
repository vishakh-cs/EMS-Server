import { model, Schema } from "mongoose";
import { EmployeeRole, EmployeeStatus } from "../../../../shared/enums/employee.enum";
import { Employees } from "../../domain/entities/employees.entity";

const employeeSchema = new Schema<Employees>({

    employeeUID: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
    },
    organizationId: {
        type: String,
        required: true,
        trim: true,
    },
    department: {
        type: String,
        trim: true,
    },
    designation: {
        type: String,
        trim: true,
    },
    joiningDate: {
        type: String,
    },
    employmentType: {
        type: String,
        trim: true,
    },
    role: {
        type: String,
        required: true,
        enum: [EmployeeRole.EMPLOYEE, EmployeeRole.MANAGER, EmployeeRole.HR, EmployeeRole.ADMIN],
    },
    status: {
        type: String,
        required: true,
        enum: [EmployeeStatus.ACTIVE, EmployeeStatus.INACTIVE, EmployeeStatus.SUSPENDED],
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    state: {
        type: String,
        required: true,
        trim: true,
    },
    country: {
        type: String,
        required: true,
        trim: true,
    },
    zipCode: {
        type: String,
        trim: true,
    },
    profileImage: {
        type: String,
    },
    emergencyContactName: {
        type: String,
    },
    emergencyContactPhone: {
        type: String,
    },
}, {
    timestamps: true,
})

const EmployeeModel = model<Employees>("Employee", employeeSchema);

export default EmployeeModel;