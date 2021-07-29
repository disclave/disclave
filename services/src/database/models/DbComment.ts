import { ObjectID, Timestamp } from "@/connectors/mongodb";

export interface DbComment {
  _id?: ObjectID;
  text: string;
  author: {
    id: string;
    name: string;
  };
  votesUp: string[];
  votesDown: string[];
  votesSum: number;
  timestamp: Timestamp;
  url: {
    raw: string;
    websiteId: string;
    pageId: string;
    meta: null | {
      logo: string | null;
      title: string | null;
    };
  };
}
