import { model, Schema } from "mongoose";
import { JobFinder } from "../../domain/entities/job-finder.entity";

const JobFinderSchema = new Schema<JobFinder>({
  name: { type: String, required: true },
  employeeId: { type: String },
}, { timestamps: true });

const JobFinderModel = model<JobFinder>("JobFinder", JobFinderSchema);

export default JobFinderModel;
