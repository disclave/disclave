import React from "react";

import { ListItem, ListItemProps } from "./ListItem";
import { Story } from "@storybook/react";
import { ExampleComment } from "@/stories/data/Comments";

export default {
  title: "Comments/List/ListItem",
  component: ListItem,
};

const Template: Story<ListItemProps> = (args) => <ListItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  comment: ExampleComment,
};

export const Authenticated = Template.bind({});
Authenticated.args = {
  authenticated: true,
  comment: ExampleComment,
};
