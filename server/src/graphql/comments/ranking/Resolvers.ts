import { Resolvers } from "@/graphql";
import { getCommentRankingService, RankingComment } from "@disclave/services";

export const resolvers = (): Resolvers => {
  const service = getCommentRankingService();

  return {
    Query: {
      latestCommentsRanking: async (
        _,
        args: { minVoteSum: number; limit: number },
        { decodedToken }
      ) => {
        const comments = await service.getLatestComments(
          args.minVoteSum,
          args.limit,
          decodedToken?.uid
        );
        return comments.map(toResponse);
      },
      topCommentsRanking: async (
        _,
        args: { minVoteSum: number; limit: number },
        { decodedToken }
      ) => {
        const comments = await service.getTopComments(
          args.minVoteSum,
          args.limit,
          decodedToken?.uid
        );
        return comments.map(toResponse);
      },
    },
  };
};

function toResponse(comment: RankingComment) {
  return {
    id: comment.id,
    text: comment.text,
    author: {
      name: comment.author.name,
    },
    votes: {
      sum: comment.votes.sum,
      votedUp: comment.votes.votedUp,
      votedDown: comment.votes.votedDown,
    },
    timestamp: comment.timestamp,
    page: {
      websiteId: comment.page.websiteId,
      pageId: comment.page.pageId,
      meta: comment.page.meta
        ? {
            logo: comment.page.meta.logo ?? null,
            title: comment.page.meta.title ?? null,
          }
        : null,
    },
  };
}
