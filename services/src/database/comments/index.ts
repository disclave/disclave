import { db } from "@/connectors/mongodb";
import { UserId } from "@/modules/auth";
import { commentsCollection } from "../collections";
import { DbComment } from "../models";

export const getProjection = (uid: UserId | null) => ({
  text: 1,
  author: {
    name: 1,
  },
  votesUp: uid ? { $elemMatch: { $eq: uid } } : undefined,
  votesDown: uid ? { $elemMatch: { $eq: uid } } : undefined,
  votesSum: 1,
  timestamp: 1,
});

export const getRankingProjection = (uid: UserId | null) => ({
  text: 1,
  author: {
    name: 1,
  },
  votesUp: uid ? { $elemMatch: { $eq: uid } } : undefined,
  votesDown: uid ? { $elemMatch: { $eq: uid } } : undefined,
  votesSum: 1,
  timestamp: 1,
  url: {
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
