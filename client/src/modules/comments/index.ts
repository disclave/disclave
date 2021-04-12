export {
  getComments,
  getLatestComments,
  getTopComments,
  createComment,
  removeCommentVote,
  addCommentVoteUp,
  addCommentVoteDown,
} from "./client";
export type {
  CommentModel,
  CommentUrlMeta,
  CommentAuthor,
  CommentVotes,
} from "./CommentModel";
