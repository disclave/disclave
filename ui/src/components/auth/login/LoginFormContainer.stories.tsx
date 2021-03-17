import React from "react";

import {
  LoginFormContainer,
  LoginFormContainerProps,
} from "./LoginFormContainer";
import { Story } from "@storybook/react";
import { ExampleUserProfile } from "../../../stories/data/UserProfiles";

export default {
  title: "Auth/Login/Container",
  component: LoginFormContainer,
};

const Template: Story<LoginFormContainerProps> = (args) => (
  <LoginFormContainer {...args} />
);

export const Default = Template.bind({});
Default.args = {
  userProfile: null,
};

export const Loading = Template.bind({});

export const Authenticated = Template.bind({});
Authenticated.args = {
  userProfile: ExampleUserProfile,
};
