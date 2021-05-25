import { Job } from "./Job";

export const runMigrations = async (jobs: Array<Job>) => {
  console.info("Running migrations");
  for (let i = 0; i < jobs.length; i++) await checkAndExecute(jobs[i]);
};

const checkAndExecute = async (job: Job) => {
  console.info(`Verifying migration job ${job.id}`);
  if (!shouldRunJob(job)) {
    console.info(`Skipping migration job ${job.id}`);
    return;
  }

  console.info(`Executing migration job ${job.id}`);
  try {
    await job.run();
    console.info(`Migration job ${job.id} executed succesfully`);
  } catch (e) {
    console.error(`Migration job ${job.id} failed.`, e);
  }
};

const shouldRunJob = async (job: Job): Promise<boolean> => {
  // TODO:
  return false;
};
