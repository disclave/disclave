import React from "react";

import { LoginUserInfo, LoginUserInfoProps } from "./LoginUserInfo";
import { Story } from "@storybook/react";
import { ExampleUserProfile } from "../../../../stories/data/UserProfiles";

export default {
  title: "Auth/Login/User Info",
  component: LoginUserInfo,
};

const Template: Story<LoginUserInfoProps> = (args) => (
  <LoginUserInfo {...args} />
);

export const Default = Template.bind({});
Default.args = {
  userProfile: ExampleUserProfile,
};
