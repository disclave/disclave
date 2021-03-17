import React from "react";

import { CommentAddAuth, CommentAddAuthProps } from "./CommentAddAuth";
import { Story } from "@storybook/react";

export default {
  title: "Comments/Auth",
  component: CommentAddAuth,
};

const Template: Story<CommentAddAuthProps> = (args) => (
  <CommentAddAuth {...args} />
);

export const Default = Template.bind({});
