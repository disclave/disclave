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

const exampleLongComments = RandomCommentsList(
  10,
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
).sort(commentsTimestampComparator);

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

export const PreviewWithWebsiteInfo = Template.bind({});
PreviewWithWebsiteInfo.args = {
  preview: true,
  showWebsite: true,
  comments: exampleLongComments,
};
