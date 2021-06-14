import React from "react";

import { RankingComment, RankingCommentProps } from "./RankingComment";
import { Story } from "@storybook/react";
import {
  ExampleComment,
  buildExampleComment,
} from "@/stories/data/RankingComments";
import { UrlId } from "@/types";
import { EmptyActionHandler } from "@/stories/data/CommentActionsHandler";

const hrefBuilder = (urlId: UrlId, commentId?: string) =>
  urlId.websiteId +
  decodeURIComponent(urlId.pageId) +
  (commentId ? `#${commentId}` : "");

export default {
  title: "Comments/Lists/Ranking/RankingComment",
  component: RankingComment,
};

const Template: Story<RankingCommentProps> = (args) => (
  <RankingComment {...args} />
);

export const Default = Template.bind({});
Default.args = {
  actionsHandler: EmptyActionHandler,
  hrefBuilder: hrefBuilder,
  comment: ExampleComment,
};

export const Authenticated = Template.bind({});
Authenticated.args = {
  actionsHandler: EmptyActionHandler,
  authenticated: true,
  hrefBuilder: hrefBuilder,
  comment: ExampleComment,
};

export const LongComment = Template.bind({});
LongComment.args = {
  actionsHandler: EmptyActionHandler,
  hrefBuilder: hrefBuilder,
  comment: buildExampleComment({
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  }),
};
