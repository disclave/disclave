import React from "react";

import { Button, ButtonProps } from "./Button";
import { Story } from "@storybook/react";

export default {
  title: "Button",
  component: Button,
};

const Template: Story<ButtonProps> = (args) => (
  <Button {...args}>Button</Button>
);

export const Default = Template.bind({});

export const Flat = Template.bind({});
Flat.args = {
  flat: true,
};

export const AsAnchorLink = Template.bind({});
AsAnchorLink.args = {
  href: "https://google.com",
};
