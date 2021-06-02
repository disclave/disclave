import { CommentModel, useSession } from '@disclave/client';
import React from 'react';
import { PageCommentsContainer } from '@disclave/ui';
import { useWebsiteComments } from '@/modules/comments';

export interface WebsiteCommentsProps {
  website: string;
  comments: Array<CommentModel>;
  loginHref: string;
  registerHref: string;
}

export const WebsiteComments: React.VFC<WebsiteCommentsProps> = (props) => {
  const {
    profile,
    actions: { logout }
  } = useSession();

  const website = props.website;
  const { comments, addComment, voteDown, voteUp, voteRemove } = useWebsiteComments(
    props.comments,
    website
  );

  return (
    <section className="my-4">
      <PageCommentsContainer
        userProfile={profile}
        comments={comments}
        className="max-h-full"
        inputTop={true}
        loginHref={props.loginHref}
        registerHref={props.registerHref}
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
