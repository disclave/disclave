import { CommentModel, logout, useSession } from '@disclave/client';
import React from 'react';
import { CommentsContainer } from '@disclave/ui';
import { useComments } from '@/modules/comments';
import { loginHref } from '@/pages/auth/login';
import { websiteHrefRaw } from '@/pages/website/[website]';
import { registerHref } from '@/pages/auth/register';

export interface WebsiteCommentsProps {
  website: string;
  comments: Array<CommentModel>;
}

export const WebsiteComments: React.VFC<WebsiteCommentsProps> = (props) => {
  const [userProfile] = useSession();

  const website = props.website;
  const { comments, addComment, addVoteUp, addVoteDown, removeVote } = useComments(
    props.comments,
    website
  );

  const loginHrefWithRedirect = loginHref(websiteHrefRaw, website);
  const registerHrefWithRedirect = registerHref(websiteHrefRaw, website);

  return (
    <section className="container mx-auto my-4">
      <CommentsContainer
        userProfile={userProfile}
        comments={comments}
        className="max-h-full"
        inputTop={true}
        loginHref={loginHrefWithRedirect}
        registerHref={registerHrefWithRedirect}
        onSubmit={addComment}
        onLogout={logout}
        onVoteUp={addVoteUp}
        onVoteRemove={removeVote}
        onVoteDown={addVoteDown}
      />
    </section>
  );
};
