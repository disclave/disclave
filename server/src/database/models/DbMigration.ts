import { Timestamp } from "@/connectors/mongodb";

export interface DbMigration {
  _id: string;
  lastRunTimestamp: Timestamp;
}
