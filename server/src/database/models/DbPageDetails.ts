import { Timestamp } from "@/connectors/mongodb";

export interface DbPageDetails {
  websiteId: string;
  pageId: string;
  title: string | null;
  logo: string | null;
  timestamp: Timestamp;
}
