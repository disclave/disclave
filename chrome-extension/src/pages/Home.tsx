import * as React from "react";
import { CommentsContainer } from "@disclave/ui";
import { useComments } from "../hooks";
import { loginHref } from "./Login";
import { logout, useSession } from "@disclave/client";
import { registerHref } from "./Register";

export const homeHref = "/";

export const Home = () => {
  const [userProfile] = useSession();

  const [comments, addComment] = useComments();

  if (comments == null) return <div>loading</div>;

  return (
    <CommentsContainer
      className="max-h-96"
      userProfile={userProfile}
      comments={comments}
      loginHref={loginHref}
      registerHref={registerHref}
      onSubmit={addComment}
      onLogout={logout}
    />
  );
};
