import { Comment } from './Comment';
import { container } from '../inversify.config';
import { CommentService } from './index';

const service = container.get(CommentService);

export const commentsResolvers = {
  Query: {
    getComments: async (_, args) => {
      const comments = await service.getComments(args.url);
      return comments.map(commentToResponse);
    }
  },
  Mutation: {
    createComment: async (_, args, context) => {
      if (!context.idToken) throw 'Unauthorized';

      const comment = await service.addComment(
        context.idToken,
        args.comment.text,
        args.comment.url
      );
      return commentToResponse(comment);
    }
  }
};

const commentToResponse = (message: Comment) => {
  return {
    id: message.id,
    text: message.text,
    author: {
      id: message.author.id,
      name: message.author.name
    },
    timestamp: message.timestamp,
    urlMeta: {
      websiteId: message.urlMeta.websiteId,
      pageId: message.urlMeta.pageId
    }
  };
};
