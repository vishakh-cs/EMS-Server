export interface JobFindRequestDTO {
  jobtitle: string[];       // e.g. ["react", "node", "express"]
  experience: string;       // e.g. "3" (years)
  location?: string;        // optional, e.g. "remote" or "India"
  employeeId?: string;
}
