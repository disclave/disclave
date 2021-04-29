import * as React from "react";
import { PageCommentsContainer } from "@disclave/ui";
import { useComments } from "../hooks";
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

  const {
    comments,
    addComment,
    addVoteDown,
    removeVote,
    addVoteUp,
  } = useComments(user, isLoading);

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
