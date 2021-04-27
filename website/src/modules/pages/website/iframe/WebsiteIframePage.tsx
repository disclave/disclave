import React, { useRef } from 'react';
import { CommentModel } from '@disclave/client';
import { loginHref } from '@/pages/auth/login';
import { PageCommentsContainer } from '@disclave/ui';
import { useWebsiteComments } from '@/modules/comments';
import { useContainerHeightMessage } from '@/modules/iframe';
import { logout, useUserProfile } from '@/modules/auth';

export interface WebsiteIframePageProps {
  website: string;
  comments: Array<CommentModel>;
}

export const WebsiteIframePage: React.VFC<WebsiteIframePageProps> = (props) => {
  const containerRef = useRef<HTMLDivElement>();
  useContainerHeightMessage(containerRef);

  const { profile } = useUserProfile();

  const { comments, addComment, voteDown, voteUp, voteRemove } = useWebsiteComments(
    props.comments,
    props.website
  );

  const loginHrefWithRedirect = loginHref();

  return (
    <div ref={containerRef} className="w-full p-3">
      <PageCommentsContainer
        userProfile={profile}
        comments={comments}
        className="h-max"
        inputTop={true}
        iframe={true}
        loginHref={loginHrefWithRedirect}
        onSubmit={addComment}
        onLogout={logout}
        commentsActionsHandler={{
          onVoteDown: voteDown,
          onVoteRemove: voteRemove,
          onVoteUp: voteUp
        }}
      />
    </div>
  );
};
