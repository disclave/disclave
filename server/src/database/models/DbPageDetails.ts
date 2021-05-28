import { Timestamp } from "@/connectors/mongodb";

export interface DbPageDetails {
  _id: {
    pageId: string;
    websiteId: string;
  };
  normalizedUrl: string;
  votesUp: string[];
  votesDown: string[];
  votesSum: number;
  meta: null | {
    logo: string | null;
    title: string | null;
  };
  timestamp: Timestamp;
}
