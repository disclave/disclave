import React from "react";

import { TextField, TextFieldProps } from "./TextField";
import { Story } from "@storybook/react";

export default {
  title: "Forms/TextField",
  component: TextField,
};

const Template: Story<TextFieldProps> = (args) => <TextField {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: "Text",
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  placeholder: "Disabled",
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
};
