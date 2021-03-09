import * as React from "react";

import { CommentsList, CommentsListProps } from "./CommentsList";
import { ExampleCommentsList } from "../../../stories/data/Comments";

export default {
  title: "Comments/List/CommentsList",
  component: CommentsList,
};

const Template = (args: CommentsListProps) => <CommentsList {...args} />;

export const Default = Template.bind({});
Default.args = {
  comments: ExampleCommentsList,
};
