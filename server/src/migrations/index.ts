import { runMigrations } from "./Migrations";

const migrations = [];

export const runAllMigrations = async () => {
  await runMigrations(migrations);
};
