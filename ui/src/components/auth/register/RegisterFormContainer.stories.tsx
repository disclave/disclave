import React from "react";

import {
  RegisterFormContainer,
  RegisterFormContainerProps,
} from "./RegisterFormContainer";
import { Story } from "@storybook/react";
import {
  ExampleUser,
  ExampleUserEmailNotVerified,
  ExampleUserNoProfile,
} from "@/stories/data/Users";

export default {
  title: "Auth/Register/Container",
  component: RegisterFormContainer,
};

const Template: Story<RegisterFormContainerProps> = (args) => (
  <RegisterFormContainer {...args} />
);

export const Default = Template.bind({});
Default.args = {
  loading: false,
  user: null,
};

export const EmailVerification = Template.bind({});
EmailVerification.args = {
  loading: false,
  user: ExampleUserEmailNotVerified,
};

export const UserName = Template.bind({});
UserName.args = {
  loading: false,
  user: ExampleUserNoProfile,
};

export const Loading = Template.bind({});
Loading.args = {
  loading: true,
};

export const Authenticated = Template.bind({});
Authenticated.args = {
  loading: false,
  user: ExampleUser,
};
