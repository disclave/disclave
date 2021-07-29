import { RankingComment } from "@/modules/comments/ranking";
import { container } from "@/inversify.config";
import { CommentRankingService } from "@/modules/comments/ranking/service";
import { DecodedIdToken } from "@/modules/auth";

export const resolvers = () => {
  const service = container.get(CommentRankingService);

  return {
    Query: {
      latestCommentsRanking: async (
        _,
        args,
        { decodedToken }: { decodedToken: DecodedIdToken }
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
        args,
        { decodedToken }: { decodedToken: DecodedIdToken }
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
