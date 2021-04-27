import React, { useRef } from 'react';
import { CommentModel } from '@disclave/client';
import { loginHref } from '@/pages/auth/login';
import { registerHref } from '@/pages/auth/register';
import { PageCommentsContainer } from '@disclave/ui';
import { useWebsiteComments } from '@/modules/comments';
import { useContainerHeightMessage } from '@/modules/iframe';
import { useUserProfile } from '@/modules/auth';
import { signOut } from 'next-auth/client';

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
  const registerHrefWithRedirect = registerHref();

  return (
    <div ref={containerRef} className="w-full p-3">
      <PageCommentsContainer
        userProfile={profile}
        comments={comments}
        className="h-max"
        inputTop={true}
        iframe={true}
        loginHref={loginHrefWithRedirect}
        registerHref={registerHrefWithRedirect}
        onSubmit={addComment}
        onLogout={() => signOut()}
        commentsActionsHandler={{
          onVoteDown: voteDown,
          onVoteRemove: voteRemove,
          onVoteUp: voteUp
        }}
      />
    </div>
  );
};
