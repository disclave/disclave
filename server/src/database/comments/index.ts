import { db } from "@/connectors/mongodb";
import { UserId } from "@/modules/auth";
import { commentsCollection } from "../collections";
import { DbComment } from "../models";

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

export const getProjectionWithUrlMeta = (uid: UserId | null) => ({
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
    meta: {
      logo: 1,
      title: 1,
    },
  },
});

export const commentsDbCollection = async () => {
  return (await db()).collection<DbComment>(commentsCollection);
};
