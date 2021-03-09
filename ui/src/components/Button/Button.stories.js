import React from "react";

import Button from "./Button";

export default {
  title: "Example/Button",
  component: Button,
  argTypes: {
    variant: {
      name: "variant",
      type: { name: "string", required: false },
      control: { type: "string" },
    },
  },
};

const Template = (args) => <Button {...args}>A Button</Button>;

export const Primary = Template.bind({});
Primary.args = {
  variant: "primary",
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: "secondary",
};
