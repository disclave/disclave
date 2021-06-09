import { M1_AddVotingToPages } from "./jobs/M1_AddVotingToPages";
import { M2_AddNormalizedUrlToPages } from "./jobs/M2_AddNormalizedUrlToPages";
import { M3_AddMatchingUrlsArrayToPages } from "./jobs/M3_AddMatchingUrlsArrayToPages";
import { runMigrations } from "./Migrations";

const migrations = [
  M1_AddVotingToPages,
  M2_AddNormalizedUrlToPages,
  M3_AddMatchingUrlsArrayToPages,
];

export const runAllMigrations = async () => {
  await runMigrations(migrations);
};
