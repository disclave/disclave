import { CommentModel, logout, useSession } from '@disclave/client';
import React from 'react';
import { CommentsContainer } from '@disclave/ui';
import { useComments } from '@/modules/comments';

export interface WebsiteCommentsProps {
  website: string;
  comments: Array<CommentModel>;
  loginHref: string;
  registerHref: string;
}

export const WebsiteComments: React.VFC<WebsiteCommentsProps> = (props) => {
  const { profile } = useSession();

  const website = props.website;
  const { comments, addComment, addVoteUp, addVoteDown, removeVote } = useComments(
    props.comments,
    website
  );

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
        onVoteUp={addVoteUp}
        onVoteRemove={removeVote}
        onVoteDown={addVoteDown}
      />
    </section>
  );
};
