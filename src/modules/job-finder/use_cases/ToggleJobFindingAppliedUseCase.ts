import JobFindingModel from "../infrastructure/models/JobFinding";
import { JobFindingResponseDTO } from "../domain/dto/job-findingResponse.dto";

export class ToggleJobFindingAppliedUseCase {
  async execute(id: string, isApplied: boolean): Promise<JobFindingResponseDTO | null> {
    const doc = await JobFindingModel.findByIdAndUpdate(
      id,
      { isApplied },
      { new: true }
    ).lean() as any;

    if (!doc) return null;

    return {
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
      isApplied: doc.isApplied,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };
  }
}
