import { CommentModel } from '@disclave/client';
import React from 'react';
import { PageCommentsContainer } from '@disclave/ui';
import { useWebsiteComments } from '@/modules/comments';
import { logout, useUserProfile } from '@/modules/auth';

export interface WebsiteCommentsProps {
  website: string;
  comments: Array<CommentModel>;
  loginHref: string;
}

export const WebsiteComments: React.VFC<WebsiteCommentsProps> = (props) => {
  const { profile } = useUserProfile();

  const website = props.website;
  const { comments, addComment, voteDown, voteUp, voteRemove } = useWebsiteComments(
    props.comments,
    website
  );

  return (
    <section className="container mx-auto my-4">
      <PageCommentsContainer
        userProfile={profile}
        comments={comments}
        className="max-h-full"
        inputTop={true}
        loginHref={props.loginHref}
        onSubmit={addComment}
        onLogout={logout}
        commentsActionsHandler={{
          onVoteDown: voteDown,
          onVoteRemove: voteRemove,
          onVoteUp: voteUp
        }}
      />
    </section>
  );
};
