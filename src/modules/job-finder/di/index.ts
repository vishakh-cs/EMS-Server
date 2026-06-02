import JobFinderController from "../presentation/controllers/JobFinder.controller";
import { CreateJobFinderUseCase } from "../use_cases/CreateJobFinderUseCase";
import { GetJobFindersUseCase } from "../use_cases/GetJobFindersUseCase";
import { MongoJobFinderRepository } from "../infrastructure/repositories/MongoJobFinderRepository";
import { CreateSmtpConfigUseCase } from "../../smtp-config/use_cases/CreateSmtpConfigUseCase";
import { createSmtpConfigUseCase } from "../../smtp-config/di";

export const jobFinderRepository = new MongoJobFinderRepository();
export const createJobFinderUseCase = new CreateJobFinderUseCase(jobFinderRepository);
export const getJobFindersUseCase = new GetJobFindersUseCase(jobFinderRepository);

export const jobFinderController = new JobFinderController(
  createJobFinderUseCase,
  getJobFindersUseCase,
  createSmtpConfigUseCase

);
