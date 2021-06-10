import { Comment } from "@/modules/comments/comments";
import { container } from "@/inversify.config";
import { CommentRankingService } from "@/modules/comments/ranking/service";
import { DecodedIdToken } from "@/modules/auth";

export const resolvers = () => {
  const service = container.get(CommentRankingService);

  return {
    Query: {
      latestComments: async (
        _,
        args,
        { decodedToken }: { decodedToken: DecodedIdToken }
      ) => {
        const comments = await service.getLatestComments(
          args.minVoteSum,
          args.limit,
          decodedToken?.uid
        );
        return comments.map(commentToResponse);
      },
      topComments: async (
        _,
        args,
        { decodedToken }: { decodedToken: DecodedIdToken }
      ) => {
        const comments = await service.getTopComments(
          args.minVoteSum,
          args.limit,
          decodedToken?.uid
        );
        return comments.map(commentToResponse);
      },
    },
  };
};

function commentToResponse(comment: Comment) {
  return {
    id: comment.id,
    text: comment.text,
    author: {
      id: comment.author.id,
      name: comment.author.name,
    },
    votes: {
      sum: comment.votes.sum,
      votedUp: comment.votes.votedUp,
      votedDown: comment.votes.votedDown,
    },
    timestamp: comment.timestamp,
    urlMeta: {
      websiteId: comment.urlMeta.websiteId,
      pageId: comment.urlMeta.pageId,
    },
  };
}
