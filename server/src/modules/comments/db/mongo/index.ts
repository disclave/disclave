import { db, ObjectID, Timestamp } from "@/connectors/mongodb";
import { UserId } from "@/modules/auth";

const websitesCollection = "websites";
const pagesCollection = "pages";
const commentsCollection = "comments";

export interface DbComment {
  _id?: ObjectID;
  text: string;
  author: {
    id: string;
    name: string;
  };
  votesUp: UserId[];
  votesDown: UserId[];
  votesSum: number;
  timestamp: Timestamp;
  url: {
    raw: string;
    websiteId: string;
    pageId: string;
  };
}

export const getProjection = (uid: UserId | null) => ({
  text: 1,
  author: {
    id: 1,
    name: 1,
  },
  votesUp: uid ? { $elemMatch: { $eq: uid } } : undefined,
  votesDown: uid ? { $elemMatch: { $eq: uid } } : undefined,
  votesSum: 1,
  timestamp: 1,
  url: {
    raw: 1,
    websiteId: 1,
    pageId: 1,
  },
});

export const commentsDbCollection = async () => {
  return (await db()).collection<DbComment>(
    `${websitesCollection}.${pagesCollection}.${commentsCollection}`
  );
};
