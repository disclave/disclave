import React from "react";

import { PageCommentsList, PageCommentsListProps } from "./PageCommentsList";
import { Story } from "@storybook/react";
import {
  commentsTimestampComparator,
  EmptyActionHandler,
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
  title: "Comments/Lists/Page/PageCommentsList",
  component: PageCommentsList,
};

const Template: Story<PageCommentsListProps> = (args) => (
  <PageCommentsList {...args} />
);

export const Default = Template.bind({});
Default.args = {
  actionsHandler: EmptyActionHandler,
  comments: exampleComments,
};

export const Authenticated = Template.bind({});
Authenticated.args = {
  actionsHandler: EmptyActionHandler,
  authenticated: true,
  comments: exampleComments,
};

export const Empty = Template.bind({});
Empty.args = {
  actionsHandler: EmptyActionHandler,
  comments: [],
};

export const LongComments = Template.bind({});
LongComments.args = {
  actionsHandler: EmptyActionHandler,
  comments: exampleLongComments,
};
