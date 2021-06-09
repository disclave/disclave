import * as React from "react";
import { PageCommentsContainer, PageVoting } from "@disclave/ui";
import { useComments, usePageDetails } from "../hooks";
import { loginHref } from "./Login";
import { registerHref } from "./Register";
import { useSession } from "@disclave/client";
import { PageInfo } from "../components/PageInfo";

export const homeHref = "/";

export const Home = () => {
  const {
    user,
    profile,
    isLoading,
    actions: { logout },
  } = useSession();

  const { urlId, pageDetails, pageActions } = usePageDetails(user, isLoading);
  const { comments, commentsActions } = useComments(urlId, user, isLoading);

  return (
    <>
      <PageInfo
        enabled={!!profile}
        pageDetails={pageDetails}
        pageActions={pageActions}
      />
      <PageCommentsContainer
        className="max-h-96"
        userProfile={profile}
        comments={comments || []}
        loginHref={loginHref}
        registerHref={registerHref}
        onSubmit={commentsActions.addComment}
        onLogout={logout}
        commentsActionsHandler={{
          onVoteDown: commentsActions.addVoteDown,
          onVoteRemove: commentsActions.removeVote,
          onVoteUp: commentsActions.addVoteUp,
        }}
        loading={!urlId || !comments}
      />
    </>
  );
};
