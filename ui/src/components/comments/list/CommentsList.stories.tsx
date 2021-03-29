import React from "react";

import { CommentsList, CommentsListProps } from "./CommentsList";
import { Story } from "@storybook/react";
import {
  commentsTimestampComparator,
  ExampleCommentsList,
} from "@/stories/data/Comments";

const exampleComments = ExampleCommentsList.sort(commentsTimestampComparator);

export default {
  title: "Comments/List/CommentsList",
  component: CommentsList,
};

const Template: Story<CommentsListProps> = (args) => <CommentsList {...args} />;

export const Default = Template.bind({});
Default.args = {
  comments: exampleComments,
};
