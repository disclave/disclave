import React from "react";

import { ListItem, ListItemProps } from "./ListItem";
import { Story } from "@storybook/react";
import { ExamplePage } from "@/stories/data/Pages";

export default {
  title: "Pages/List/Item/Pages List Item",
  component: ListItem,
};

const Template: Story<ListItemProps> = (args) => <ListItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  page: ExamplePage,
};
