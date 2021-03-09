import * as React from "react";

import { Button, ButtonProps } from "./Button";

export default {
  title: "Button",
  component: Button,
};

const Template = (args: ButtonProps) => <Button {...args}>Text</Button>;

export const Default = Template.bind({});
