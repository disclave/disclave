import React from "react";

import { Button, ButtonProps } from "./Button";
import { Story } from "@storybook/react";

export default {
  title: "Button",
  component: Button,
};

const Template: Story<ButtonProps> = (args) => (
  <Button {...args}>A Button</Button>
);

export const Default = Template.bind({});
