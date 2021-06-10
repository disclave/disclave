import React, { useRef } from 'react';
import { PageCommentModel, PageDetailsModel, useSession } from '@disclave/client';
import { loginHref } from '@/pages/auth/login';
import { PageCommentsContainer } from '@disclave/ui';
import { useWebsiteComments } from '@/modules/comments';
import { useContainerHeightMessage } from '@/modules/iframe';
import { registerHref } from '@/pages/auth/register';
import { IframeVote } from './vote';

export interface WebsiteIframePageProps {
  website: string;
  pageDetails: PageDetailsModel;
  comments: Array<PageCommentModel>;
  hideVotes: boolean;
}

export const WebsiteIframePage: React.VFC<WebsiteIframePageProps> = (props) => {
  const containerRef = useRef<HTMLDivElement>();
  useContainerHeightMessage(containerRef);

  const urlId = {
    websiteId: props.pageDetails.websiteId,
    pageId: props.pageDetails.pageId
  };

  const {
    profile,
    actions: { logout }
  } = useSession();

  const { comments, addComment, voteDown, voteUp, voteRemove } = useWebsiteComments(
    props.comments,
    urlId,
    props.website
  );

  const loginHrefWithRedirect = loginHref();
  const registerHrefWithRedirect = registerHref();

  return (
    <div ref={containerRef} className="w-full p-3">
      {!props.hideVotes ? <IframeVote pageDetails={props.pageDetails} /> : null}
      <PageCommentsContainer
        userProfile={profile}
        comments={comments}
        className="h-max"
        inputTop={true}
        iframe={true}
        loginHref={loginHrefWithRedirect}
        registerHref={registerHrefWithRedirect}
        onSubmit={addComment}
        onLogout={logout}
        commentsActionsHandler={{
          onVoteDown: voteDown,
          onVoteRemove: voteRemove,
          onVoteUp: voteUp
        }}
        loading={false}
      />
    </div>
  );
};
