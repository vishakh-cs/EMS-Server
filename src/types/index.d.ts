declare namespace Express {
  export interface Request {
    user?: {
      id: string;
      email: string;
      role: string;
      organizationUID?: string;
<<<<<<< HEAD
=======
      organizationId?: string;
      employeeUID?: string;
>>>>>>> jobfinder
    };
  }
}