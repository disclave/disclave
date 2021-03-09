import React from "react";

import { CommentsList, CommentsListProps } from "./CommentsList";
import { ExampleCommentsList } from "../../../../stories/data/Comments";
import { Story } from "@storybook/react";

export default {
  title: "Comments/List/CommentsList",
  component: CommentsList,
};

const Template: Story<CommentsListProps> = (args) => <CommentsList {...args} />;

export const Default = Template.bind({});
Default.args = {
  comments: ExampleCommentsList,
};
