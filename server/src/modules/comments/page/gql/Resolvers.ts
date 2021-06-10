import { PageComment } from "@/modules/comments/page";
import { container } from "@/inversify.config";
import { PageCommentService } from "@/modules/comments/page/service";
import { Unauthorized } from "@/exceptions/exceptions";
import { AuthProvider, DecodedIdToken, IdToken } from "@/modules/auth";

export const resolvers = () => {
  const authProvider = container.get(AuthProvider);
  const service = container.get(PageCommentService);

  return {
    Query: {
      getComments: async (
        _,
        args,
        { decodedToken }: { decodedToken: DecodedIdToken }
      ) => {
        const comments = await service.getPageComments(
          args.urlId,
          decodedToken?.uid
        );
        return comments.map(toResponse);
      },
    },
    Mutation: {
      createComment: async (_, args, { idToken }: { idToken: IdToken }) => {
        if (!idToken)
          throw Unauthorized("You have to be authorized to create comment.");
        const decodedToken = await authProvider.verifyIdToken(idToken, true);
        const comment = await service.addPageComment(
          decodedToken.uid,
          args.comment.text,
          args.comment.urlId,
          args.comment.rawUrl
        );
        return toResponse(comment);
      },
    },
  };
};

function toResponse(comment: PageComment) {
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
  };
}
