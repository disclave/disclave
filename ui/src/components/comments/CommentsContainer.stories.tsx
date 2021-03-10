import React from "react";

import { CommentsContainer, CommentsContainerProps } from "./CommentsContainer";
import { Story } from "@storybook/react";
import { RandomCommentsList } from "../../stories/data/Comments";

const exampleComments = RandomCommentsList(50).sort(
  (a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp)
);

export default {
  title: "Comments",
  component: CommentsContainer,
};

const Template: Story<CommentsContainerProps> = (args) => (
  <CommentsContainer {...args} />
);

export const Default = Template.bind({});
Default.args = {
  comments: exampleComments,
};
