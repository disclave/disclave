import React from "react";

import {
  RegisterFormContainer,
  RegisterFormContainerProps,
} from "./RegisterFormContainer";
import { Story } from "@storybook/react";
import {
  ExampleUserProfile,
  ExampleUserProfileWithFillPending,
} from "../../../stories/data/UserProfiles";

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
  userProfile: null,
};

export const UserName = Template.bind({});
UserName.args = {
  loading: false,
  userProfile: ExampleUserProfileWithFillPending,
};

export const Loading = Template.bind({});
Loading.args = {
  loading: true,
};

export const Authenticated = Template.bind({});
Authenticated.args = {
  loading: false,
  userProfile: ExampleUserProfile,
};
