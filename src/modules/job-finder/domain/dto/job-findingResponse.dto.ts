export interface JobFindingResponseDTO {
  id: string;
  jobTitle: string;
  companyName?: string;
  email?: string;
  location?: string;
  jobType?: string;
  experienceRequired?: string;
  description?: string;
  applyUrl?: string;
  source?: string;
  postedDate?: Date;
  searchKeywords: string[];
  employeeId?: string;
  createdAt: Date;
  updatedAt: Date;
}
