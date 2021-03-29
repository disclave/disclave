import React from "react";

import { UserInfo, UserInfoProps } from "./UserInfo";
import { Story } from "@storybook/react";
import { ExampleUserProfile } from "@/stories/data/UserProfiles";

export default {
  title: "Auth/User Info",
  component: UserInfo,
};

const Template: Story<UserInfoProps> = (args) => <UserInfo {...args} />;

export const Default = Template.bind({});
Default.args = {
  userProfile: ExampleUserProfile,
};
