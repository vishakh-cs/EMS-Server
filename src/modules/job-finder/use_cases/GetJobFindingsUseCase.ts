import JobFindingModel from "../infrastructure/models/JobFinding";
import { JobFindingResponseDTO } from "../domain/dto/job-findingResponse.dto";

export class GetJobFindingsUseCase {
  async execute(employeeId?: string): Promise<JobFindingResponseDTO[]> {
    const filter = employeeId ? { employeeId } : {};
    const docs = await JobFindingModel.find(filter).sort({ createdAt: -1 }).lean();

    return docs.map((doc: any) => ({
      id: doc._id.toString(),
      jobTitle: doc.jobTitle,
      companyName: doc.companyName,
      email: doc.email,
      location: doc.location,
      jobType: doc.jobType,
      experienceRequired: doc.experienceRequired,
      description: doc.description,
      applyUrl: doc.applyUrl,
      source: doc.source,
      postedDate: doc.postedDate,
      searchKeywords: doc.searchKeywords,
      employeeId: doc.employeeId,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    }));
  }
}
