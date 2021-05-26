import * as React from "react";
import { PageCommentsContainer } from "@disclave/ui";
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

  const { pageDetails } = usePageDetails(user, isLoading);

  // TODO: update loading component
  if (!comments || !pageDetails) return <div>loading</div>;

  return (
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
  );
};
