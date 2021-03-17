import React from "react";

import {
  LoginFormContainer,
  LoginFormContainerProps,
} from "./LoginFormContainer";
import { Story } from "@storybook/react";

export default {
  title: "Auth/Login",
  component: LoginFormContainer,
};

const Template: Story<LoginFormContainerProps> = (args) => (
  <LoginFormContainer {...args} />
);

export const LoginContainer = Template.bind({});
