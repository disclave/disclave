import React from "react";

import { ListItemTimestamp, ListItemTimestampProps } from "./ListItemTimestamp";
import { Story } from "@storybook/react";
import { ExampleComment } from "@/stories/data/Comments";

export default {
  title: "Comments/List/Item/Header/ListItemTimestamp",
  component: ListItemTimestamp,
};

const Template: Story<ListItemTimestampProps> = (args) => (
  <ListItemTimestamp {...args} />
);

export const Default = Template.bind({});
Default.args = {
  comment: ExampleComment,
};

export const WithLink = Template.bind({});
WithLink.args = {
  comment: ExampleComment,
  href: "#test",
};

export const CustomClass = Template.bind({});
CustomClass.args = {
  comment: ExampleComment,
  className: "text-primary",
};
