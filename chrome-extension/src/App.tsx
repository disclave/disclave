import * as React from "react";
import { CommentsContainer } from "@webchat/ui";
import { useComments } from "./hooks";

export const App = () => {
  const [comments, addComment] = useComments();

  if (comments == null) return <div className="m-4">loading</div>;

  return (
    <div className="w-80 m-4">
      <CommentsContainer
        className="max-h-96"
        authenticated={false}
        comments={comments}
        loginHref="#login"
        onSubmit={addComment}
      />
    </div>
  );
};
