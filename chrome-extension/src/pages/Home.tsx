import * as React from "react";
import { PageCommentsContainer, PageVoting } from "@disclave/ui";
import { useComments, usePageDetails } from "../hooks";
import { loginHref } from "./Login";
import { registerHref } from "./Register";
import { useSession } from "@disclave/client";

export const homeHref = "/";

export const Home = () => {
  const {
    user,
    profile,
    isLoading,
    actions: { logout },
  } = useSession();

  const { comments, commentsActions } = useComments(user, isLoading);

  const { pageDetails, pageActions } = usePageDetails(user, isLoading);

  // TODO: update loading component
  if (!comments || !pageDetails) return <div>loading</div>;

  return (
    <>
      <PageVoting
        enabled={!!profile}
        votes={{
          sum: pageDetails.votes.sum,
          votedDown: pageDetails.votes.votedDown,
          votedUp: pageDetails.votes.votedUp,
        }}
        onVoteDown={pageActions.addVoteDown}
        onVoteRemove={pageActions.removeVote}
        onVoteUp={pageActions.addVoteUp}
      />
      <PageCommentsContainer
        className="max-h-96"
        userProfile={profile}
        comments={comments}
        loginHref={loginHref}
        registerHref={registerHref}
        onSubmit={commentsActions.addComment}
        onLogout={logout}
        commentsActionsHandler={{
          onVoteDown: commentsActions.addVoteDown,
          onVoteRemove: commentsActions.removeVote,
          onVoteUp: commentsActions.addVoteUp,
        }}
      />
    </>
  );
};
