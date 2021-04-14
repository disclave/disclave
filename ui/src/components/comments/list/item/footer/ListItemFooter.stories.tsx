import React from "react";

import { ListItemFooter, ListItemFooterProps } from "./ListItemFooter";
import { Story } from "@storybook/react";
import { EmptyActionHandler, ExampleComment } from "@/stories/data/Comments";

export default {
  title: "Comments/List/Item/ListItemFooter",
  component: ListItemFooter,
};

const Template: Story<ListItemFooterProps> = (args) => (
  <ListItemFooter {...args} />
);

export const Default = Template.bind({});
Default.args = {
  actionsHandler: EmptyActionHandler,
  comment: ExampleComment,
};

export const Authenticated = Template.bind({});
Authenticated.args = {
  actionsHandler: EmptyActionHandler,
  authenticated: true,
  comment: ExampleComment,
};

export const CustomClass = Template.bind({});
CustomClass.args = {
  actionsHandler: EmptyActionHandler,
  className: "border rounded bg-gray-100 p-4",
  comment: ExampleComment,
};
