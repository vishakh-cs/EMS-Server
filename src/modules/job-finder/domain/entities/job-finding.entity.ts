export interface JobFinding {
  id?: string;
  jobTitle: string;
  companyName?: string;
  email?: string;
  location?: string;
  jobType?: string;          // full-time, remote, contract, etc.
  experienceRequired?: string;
  description?: string;
  applyUrl?: string;
  source?: string;           // e.g. LinkedIn, Indeed, Glassdoor
  postedDate?: Date;
  searchKeywords: string[];  // the jobtitles used to search
  employeeId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
