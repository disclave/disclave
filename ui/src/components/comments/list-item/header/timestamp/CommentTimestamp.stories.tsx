import React from "react";

import { CommentTimestamp, CommentTimestampProps } from "./CommentTimestamp";
import { Story } from "@storybook/react";
import { ExampleComment } from "@/stories/data/PageComments";

export default {
  title: "Comments/List/Item/Header/Timestamp",
  component: CommentTimestamp,
};

const Template: Story<CommentTimestampProps> = (args) => (
  <CommentTimestamp {...args} />
);

export const Default = Template.bind({});
Default.args = {
  timestamp: ExampleComment.timestamp,
};

export const WithLink = Template.bind({});
WithLink.args = {
  timestamp: ExampleComment.timestamp,
  href: "#test",
};

export const CustomClass = Template.bind({});
CustomClass.args = {
  timestamp: ExampleComment.timestamp,
  className: "text-primary",
};
