import React from "react";

import {
  RegisterFormContainer,
  RegisterFormContainerProps,
} from "./RegisterFormContainer";
import { Story } from "@storybook/react";
import {
  ExampleSession,
  ExampleSessionEmailNotVerified,
  ExampleSessionNoProfile,
} from "@/stories/data/Sessions";

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
  session: null,
};

export const EmailVerification = Template.bind({});
EmailVerification.args = {
  loading: false,
  session: ExampleSessionEmailNotVerified,
};

export const UserName = Template.bind({});
UserName.args = {
  loading: false,
  session: ExampleSessionNoProfile,
};

export const Loading = Template.bind({});
Loading.args = {
  loading: true,
};

export const Authenticated = Template.bind({});
Authenticated.args = {
  loading: false,
  session: ExampleSession,
};
