import { Unauthorized } from "@/exceptions";
import {
  getAuthProvider,
  getPageCommentService,
  DecodedIdToken,
  IdToken,
  PageComment,
} from "@disclave/services";

export const resolvers = () => {
  const authProvider = getAuthProvider();
  const service = getPageCommentService();

  return {
    Query: {
      getPageComments: async (
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
      createPageComment: async (_, args, { idToken }: { idToken: IdToken }) => {
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
