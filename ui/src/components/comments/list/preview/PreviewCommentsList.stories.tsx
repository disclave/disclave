import React from "react";

import {
  PreviewCommentsList,
  PreviewCommentsListProps,
} from "./PreviewCommentsList";
import { Story } from "@storybook/react";
import {
  commentsTimestampComparator,
  EmptyActionHandler,
  RandomCommentsList,
} from "@/stories/data/Comments";
import { CommentUrlMeta } from "@/components/comments/CommentModel";

const exampleComments = RandomCommentsList(10).sort(
  commentsTimestampComparator
);

const exampleLongComments = RandomCommentsList(
  10,
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
).sort(commentsTimestampComparator);

const hrefBuilder = (urlMeta: CommentUrlMeta, commentId?: string) =>
  urlMeta.websiteId +
  decodeURIComponent(urlMeta.pageId) +
  (commentId ? `#${commentId}` : "");

export default {
  title: "Comments/Lists/Preview/PreviewCommentsList",
  component: PreviewCommentsList,
};

const Template: Story<PreviewCommentsListProps> = (args) => (
  <PreviewCommentsList {...args} />
);

export const Default = Template.bind({});
Default.args = {
  actionsHandler: EmptyActionHandler,
  comments: exampleComments,
  hrefBuilder: hrefBuilder,
};

export const Authenticated = Template.bind({});
Authenticated.args = {
  actionsHandler: EmptyActionHandler,
  authenticated: true,
  comments: exampleComments,
  hrefBuilder: hrefBuilder,
};

export const Empty = Template.bind({});
Empty.args = {
  actionsHandler: EmptyActionHandler,
  comments: [],
  hrefBuilder: hrefBuilder,
};

export const LongComments = Template.bind({});
LongComments.args = {
  actionsHandler: EmptyActionHandler,
  comments: exampleLongComments,
  hrefBuilder: hrefBuilder,
};
