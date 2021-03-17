import React from "react";

import { LoginForm, LoginFormProps } from "./LoginForm";
import { Story } from "@storybook/react";

export default {
  title: "Auth/Login/Form",
  component: LoginForm,
};

const Template: Story<LoginFormProps> = (args) => <LoginForm {...args} />;

export const Default = Template.bind({});
