import { Job } from "./Job";
import { runMigrations } from "./Migrations";

const migrations: Job[] = [];

export const runAllMigrations = async () => {
  await runMigrations(migrations);
};
