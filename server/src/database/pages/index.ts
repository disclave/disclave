import { db } from "@/connectors/mongodb";
import { pagesCollection } from "../collections";
import { DbPageDetails } from "../models";
import { UserId } from "@/modules/auth";

export const getProjection = (uid: UserId | null) => ({
  normalizedUrl: 1,
  votesUp: uid ? { $elemMatch: { $eq: uid } } : undefined,
  votesDown: uid ? { $elemMatch: { $eq: uid } } : undefined,
  votesSum: 1,
  meta: {
    logo: 1,
    title: 1,
  },
  timestamp: 1,
});

export const getAggregationProjection = (uid: UserId | null) => ({
  normalizedUrl: 1,
  votesUp: aggrVotesUpProjection(uid),
  votesDown: aggrVotesDownProjection(uid),
  votesSum: 1,
  meta: {
    logo: 1,
    title: 1,
  },
})

const aggrVotesUpProjection = (uid: UserId | null) =>
  uid
    ? {
        $filter: {
          input: "$votesUp",
          as: "voteUp",
          cond: { $eq: ["$$voteUp", uid] },
        },
      }
    : undefined;

const aggrVotesDownProjection = (uid: UserId | null) =>
  uid
    ? {
        $filter: {
          input: "$votesDown",
          as: "voteDown",
          cond: { $eq: ["$$voteDown", uid] },
        },
      }
    : undefined;

export const pagesDbCollection = async () => {
  return (await db()).collection<DbPageDetails>(pagesCollection);
};
