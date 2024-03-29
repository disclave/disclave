import { timestampNow } from "@/connectors/mongodb";
import { migrationsDbCollection } from "@/database/migrations";
import { Job } from "./Job";

export const runMigrations = async (jobs: Array<Job>) => {
  console.info("Running migrations");
  for (let i = 0; i < jobs.length; i++) await checkAndExecute(jobs[i]);
};

const checkAndExecute = async (job: Job) => {
  console.info(`Verifying migration job ${job.id}`);

  const shouldExecute = await shouldRunJob(job);
  if (!shouldExecute) {
    console.info(`Skipping migration job ${job.id}`);
    return;
  }

  console.info(`Executing migration job ${job.id}`);
  try {
    await job.run();
    console.info(`Migration job ${job.id} executed succesfully. Saving to DB`);
    saveJobRunToDb(job);
    console.info(`Migration job ${job.id} run saved to DB`);
  } catch (e) {
    console.error(`Migration job ${job.id} failed.`, e);
  }
};

const shouldRunJob = async (job: Job): Promise<boolean> => {
  const collection = await migrationsDbCollection();
  const doc = await collection.findOne({ _id: job.id });
  return !doc;
};

const saveJobRunToDb = async (job: Job) => {
  const collection = await migrationsDbCollection();
  collection.insertOne({
    _id: job.id,
    lastRunTimestamp: timestampNow(),
  });
};
