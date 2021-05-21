import { Timestamp } from "@/connectors/mongodb";

export interface DbPageDetails {
  _id: {
    pageId: string;
    websiteId: string;
  };
  meta: {
    logo: string | null;
    title: string | null;
  };
  timestamp: Timestamp;
}
