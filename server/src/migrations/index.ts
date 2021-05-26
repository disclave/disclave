import { AddVotingToPages } from "./jobs/AddVotingToPages";
import { M2_AddNormalizedUrlToPages } from "./jobs/M2_AddNormalizedUrlToPages";
import { runMigrations } from "./Migrations";

const migrations = [AddVotingToPages, M2_AddNormalizedUrlToPages];

export const runAllMigrations = async () => {
  await runMigrations(migrations);
};
