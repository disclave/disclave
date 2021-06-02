import { Timestamp } from "@/connectors/mongodb";

export interface DbPageConfig {
  _id: string;
  preserveQueryParams: string[];
  timestamp: Timestamp;
}
