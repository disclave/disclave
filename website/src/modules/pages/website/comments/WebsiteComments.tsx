import { CommentModel, logout, useSession } from '@disclave/client';
import React from 'react';
import { PageCommentsContainer } from '@disclave/ui';
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
  const { comments, addComment, voteDown, voteUp, voteRemove } = useWebsiteComments(
    props.comments,
    website,
    props.serverSideUid
  );

  return (
    <section className="container mx-auto my-4">
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
