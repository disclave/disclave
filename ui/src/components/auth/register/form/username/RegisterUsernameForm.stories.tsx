import React from "react";

import {
  RegisterUsernameForm,
  RegisterUsernameFormProps,
} from "./RegisterUsernameForm";
import { Story } from "@storybook/react";

export default {
  title: "Auth/Register/User name Form",
  component: RegisterUsernameForm,
};

const Template: Story<RegisterUsernameFormProps> = (args) => (
  <RegisterUsernameForm {...args} />
);

export const Default = Template.bind({});
Default.args = {
  userEmail: "example@domain.com",
};
