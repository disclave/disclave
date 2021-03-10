import React from "react";

import { Input, InputProps } from "./Input";
import { Story } from "@storybook/react";

export default {
  title: "Forms/Input",
  component: Input,
};

const Template: Story<InputProps> = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: "Text",
};

export const Email = Template.bind({});
Email.args = {
  type: "email",
  placeholder: "Email",
};

export const Password = Template.bind({});
Password.args = {
  type: "password",
  placeholder: "Password",
  value: "Password",
};
