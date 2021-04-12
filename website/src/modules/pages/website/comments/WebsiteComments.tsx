import {
  addCommentVoteDown,
  addCommentVoteUp,
  CommentModel,
  logout,
  removeCommentVote,
  useSession
} from '@disclave/client';
import React from 'react';
import { CommentsContainer } from '@disclave/ui';
import { useWebsiteComments } from '@/modules/comments';

export interface WebsiteCommentsProps {
  website: string;
  comments: Array<CommentModel>;
  loginHref: string;
  registerHref: string;
  serverSideUid: string | null;
}

export const WebsiteComments: React.VFC<WebsiteCommentsProps> = (props) => {
  const { profile } = useSession();

  const website = props.website;
  const { comments, addComment } = useWebsiteComments(props.comments, website, props.serverSideUid);

  const onVoteUp = async (commentId: string) => {
    await addCommentVoteUp(commentId);
  };

  const onVoteDown = async (commentId: string) => {
    await addCommentVoteDown(commentId);
  };

  const onVoteRemove = async (commentId: string) => {
    await removeCommentVote(commentId);
  };

  return (
    <section className="container mx-auto my-4">
      <CommentsContainer
        userProfile={profile}
        comments={comments}
        className="max-h-full"
        inputTop={true}
        loginHref={props.loginHref}
        registerHref={props.registerHref}
        onSubmit={addComment}
        onLogout={logout}
        onVoteUp={onVoteUp}
        onVoteRemove={onVoteRemove}
        onVoteDown={onVoteDown}
      />
    </section>
  );
};
