declare namespace Express {
  export interface Request {
    user?: {
      id: string;
      email: string;
      role: string;
      organizationUID?: string;
      organizationId?: string;
      employeeUID?: string;
    };
  }
}