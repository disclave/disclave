import React from "react";

import { Button, ButtonProps } from "./Button";
import { Story } from "@storybook/react";

export default {
  title: "Button",
  component: Button,
};

const Template: Story<ButtonProps> = (args) => (
  <div className="space-x-4">
    <Button {...args}>Button</Button>
    <Button {...args} disabled>
      Disabled
    </Button>
  </div>
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

export const FlatAsAnchorLink = Template.bind({});
FlatAsAnchorLink.args = {
  flat: true,
  href: "https://google.com",
};
