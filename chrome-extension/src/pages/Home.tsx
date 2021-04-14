import * as React from "react";
import { PageCommentsContainer } from "@disclave/ui";
import { useComments } from "../hooks";
import { loginHref } from "./Login";
import { logout, useSession } from "@disclave/client";
import { registerHref } from "./Register";

export const homeHref = "/";

export const Home = () => {
  const { profile, isLoading } = useSession();

  const {
    comments,
    addComment,
    addVoteDown,
    removeVote,
    addVoteUp,
  } = useComments(profile, isLoading);

  if (!comments) return <div>loading</div>;

  return (
    <PageCommentsContainer
      className="max-h-96"
      userProfile={profile}
      comments={comments}
      loginHref={loginHref}
      registerHref={registerHref}
      onSubmit={addComment}
      onLogout={logout}
      commentsActionsHandler={{
        onVoteDown: addVoteDown,
        onVoteRemove: removeVote,
        onVoteUp: addVoteUp,
      }}
    />
  );
};
