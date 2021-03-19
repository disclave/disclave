import * as React from "react";
import { CommentsContainer } from "@webchat/ui";
import { useComments } from "./hooks";

export const App = () => {
  const [comments, addComment] = useComments();

  if (comments == null) return <div>loading</div>;

  return (
    <div>
      <CommentsContainer
        authenticated={false}
        comments={comments}
        loginHref="#login"
        onSubmit={addComment}
      />
    </div>
  );
};
