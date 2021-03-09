import * as React from "react";

import { ListItem, ListItemProps } from "./ListItem";
import { ExampleComment } from "../../../stories/data/Comments";

export default {
  title: "Comments/List/ListItem",
  component: ListItem,
};

const Template = (args: ListItemProps) => <ListItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  comment: ExampleComment,
};
