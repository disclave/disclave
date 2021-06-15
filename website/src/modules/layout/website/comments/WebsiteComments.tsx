import { PageCommentModel, useSession, UrlId } from '@disclave/client';
import React from 'react';
import { PageCommentsContainer } from '@disclave/ui';
import { useWebsiteComments } from '@/modules/comments';

export interface WebsiteCommentsProps {
  urlId: UrlId | null;
  website: string;
  comments: Array<PageCommentModel>;
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
    props.urlId,
    website
  );

  return (
    <section>
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
        loading={!props.urlId}
      />
    </section>
  );
};
