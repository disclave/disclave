import React from "react";

import { CommentAddForm, CommentAddFormProps } from "./CommentAddForm";
import { Story } from "@storybook/react";

export default {
  title: "Comments/Add",
  component: CommentAddForm,
};

const Template: Story<CommentAddFormProps> = (args) => (
  <CommentAddForm {...args} />
);

export const Default = Template.bind({});
