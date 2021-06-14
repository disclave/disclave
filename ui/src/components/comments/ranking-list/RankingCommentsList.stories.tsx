import React from "react";
import {
  RankingCommentsList,
  RankingCommentsListProps,
} from "./RankingCommentsList";
import { Story } from "@storybook/react";
import { RandomCommentsList } from "@/stories/data/RankingComments";
import { commentsTimestampComparator } from "@/stories/data/helpers";
import { UrlId } from "@/types";
import { EmptyActionHandler } from "@/stories/data/CommentActionsHandler";

const exampleComments = RandomCommentsList(10).sort(
  commentsTimestampComparator
);

const exampleLongComments = RandomCommentsList(
  10,
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
).sort(commentsTimestampComparator);

const hrefBuilder = (urlId: UrlId, commentId?: string) =>
  urlId.websiteId +
  decodeURIComponent(urlId.pageId) +
  (commentId ? `#${commentId}` : "");

export default {
  title: "Comments/Lists/Ranking/RankingCommentsList",
  component: RankingCommentsList,
};

const Template: Story<RankingCommentsListProps> = (args) => (
  <RankingCommentsList {...args} />
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
