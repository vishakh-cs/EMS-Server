import { model, Schema } from "mongoose";
import { JobFinding } from "../../domain/entities/job-finding.entity";

const JobFindingSchema = new Schema<JobFinding>(
  {
    jobTitle: { type: String, required: true },
    companyName: { type: String },
    location: { type: String },
    jobType: { type: String },
    experienceRequired: { type: String },
    description: { type: String },
    applyUrl: { type: String },
    source: { type: String },
    postedDate: { type: Date },
    searchKeywords: { type: [String], default: [] },
    employeeId: { type: String },
  },
  { timestamps: true }
);

const JobFindingModel = model<JobFinding>("jobfindings", JobFindingSchema);

export default JobFindingModel;
