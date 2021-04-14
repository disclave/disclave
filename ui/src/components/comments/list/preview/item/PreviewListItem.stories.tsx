import React from "react";

import { PreviewListItem, PreviewListItemProps } from "./PreviewListItem";
import { Story } from "@storybook/react";
import {
  ExampleComment,
  buildExampleComment,
  EmptyActionHandler,
} from "@/stories/data/Comments";
import { CommentUrlMeta } from "@/components/comments/CommentModel";

const hrefBuilder = (urlMeta: CommentUrlMeta, commentId?: string) =>
  urlMeta.websiteId +
  decodeURIComponent(urlMeta.pageId) +
  (commentId ? `#${commentId}` : "");

export default {
  title: "Comments/Lists/Preview/PreviewListItem",
  component: PreviewListItem,
};

const Template: Story<PreviewListItemProps> = (args) => (
  <PreviewListItem {...args} />
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
