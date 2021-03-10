import React from "react";

import { CommentsContainer, CommentsContainerProps } from "./CommentsContainer";
import { Story } from "@storybook/react";
import { ExampleCommentsList } from "../../stories/data/Comments";

const exampleComments = ExampleCommentsList.sort(
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
