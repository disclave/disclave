import { AddVotingToPages } from "./jobs/AddVotingToPages";
import { runMigrations } from "./Migrations";

const migrations = [AddVotingToPages];

export const runAllMigrations = async () => {
  await runMigrations(migrations);
};
