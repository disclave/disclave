import React from "react";

import { CommentsList, CommentsListProps } from "./CommentsList";
import { Story } from "@storybook/react";
import {
  commentsTimestampComparator,
  RandomCommentsList,
} from "@/stories/data/Comments";

const exampleComments = RandomCommentsList(10).sort(
  commentsTimestampComparator
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

export const Authenticated = Template.bind({});
Authenticated.args = {
  authenticated: true,
  comments: exampleComments,
};

export const ShowWebsite = Template.bind({});
ShowWebsite.args = {
  showWebsite: true,
  comments: exampleComments,
};

export const AuthenticatedShowWebsite = Template.bind({});
AuthenticatedShowWebsite.args = {
  authenticated: true,
  showWebsite: true,
  comments: exampleComments,
};

export const Empty = Template.bind({});
Empty.args = {
  comments: [],
};
