import * as React from "react";
import { CommentsContainer } from "@webchat/ui";
import { useComments } from "../hooks";
import { loginHref } from "./Login";

export const homeHref = "/";

export const Home = () => {
  const [comments, addComment] = useComments();

  if (comments == null) return <div>loading</div>;

  return (
    <CommentsContainer
      className="max-h-96"
      authenticated={false}
      comments={comments}
      loginHref={loginHref}
      onSubmit={addComment}
    />
  );
};
