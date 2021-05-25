import { db } from "@/connectors/mongodb";
import { pagesCollection } from "../collections";
import { DbPageDetails } from "../models";
import { UserId } from "@/modules/auth";

export const getProjection = (uid: UserId | null) => ({
  votesUp: uid ? { $elemMatch: { $eq: uid } } : undefined,
  votesDown: uid ? { $elemMatch: { $eq: uid } } : undefined,
  votesSum: 1,
  meta: {
    logo: 1,
    title: 1,
  },
  timestamp: 1,
});

export const pagesDbCollection = async () => {
  return (await db()).collection<DbPageDetails>(pagesCollection);
};
