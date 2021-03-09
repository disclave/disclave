import React from "react";

import { CommentsList, CommentsListProps } from "./CommentsList";
import { Story } from "@storybook/react";
import { ExampleCommentsList } from "../../../stories/data/Comments";

const exampleComments = ExampleCommentsList.sort(
  (a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp)
);

export default {
  title: "Comments/List/CommentsList",
  component: CommentsList,
};

const Template: Story<CommentsListProps> = (args) => <CommentsList {...args} />;

export const Default = Template.bind({});
Default.args = {
  comments: exampleComments,
};
