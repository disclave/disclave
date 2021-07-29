import { db } from "@/connectors/mongodb";
import { migrationsCollection } from "../collections";
import { DbMigration } from "../models";

export const migrationsDbCollection = async () => {
  return (await db()).collection<DbMigration>(migrationsCollection);
};
