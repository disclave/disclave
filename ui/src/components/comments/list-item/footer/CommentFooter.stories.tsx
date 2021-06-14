import React from "react";

import { CommentFooter, CommentFooterProps } from "./CommentFooter";
import { Story } from "@storybook/react";
import { ExampleComment } from "@/stories/data/PageComments";
import { EmptyActionHandler } from "@/stories/data/CommentActionsHandler";

export default {
  title: "Comments/List/Item/Footer",
  component: CommentFooter,
};

const Template: Story<CommentFooterProps> = (args) => (
  <CommentFooter {...args} />
);

export const Default = Template.bind({});
Default.args = {
  actionsHandler: EmptyActionHandler,
  commentId: ExampleComment.id,
  votes: ExampleComment.votes,
};

export const Authenticated = Template.bind({});
Authenticated.args = {
  actionsHandler: EmptyActionHandler,
  authenticated: true,
  commentId: ExampleComment.id,
  votes: ExampleComment.votes,
};

export const CustomClass = Template.bind({});
CustomClass.args = {
  actionsHandler: EmptyActionHandler,
  className: "border rounded bg-gray-100 p-4",
  commentId: ExampleComment.id,
  comment: ExampleComment,
  votes: ExampleComment.votes,
};
