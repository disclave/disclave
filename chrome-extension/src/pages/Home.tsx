import * as React from "react";
import { CommentsContainer } from "@webchat/ui";
import { useComments } from "../hooks";
import { loginHref } from "./Login";
import { useSession } from "@webchat/client";

export const homeHref = "/";

export const Home = () => {
  const [, , isActiveAccount] = useSession();

  const [comments, addComment] = useComments();

  if (comments == null) return <div>loading</div>;

  return (
    <CommentsContainer
      className="max-h-96"
      authenticated={isActiveAccount}
      comments={comments}
      loginHref={loginHref}
      onSubmit={addComment}
    />
  );
};
