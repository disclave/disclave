import React from "react";

import { CommentsList, CommentsListProps } from "./CommentsList";
import { Story } from "@storybook/react";
import { ExampleCommentsList } from "../../../stories/data/Comments";

export default {
  title: "Comments/List/CommentsList",
  component: CommentsList,
};

const Template: Story<CommentsListProps> = (args) => <CommentsList {...args} />;

export const Default = Template.bind({});
Default.args = {
  comments: ExampleCommentsList,
};
