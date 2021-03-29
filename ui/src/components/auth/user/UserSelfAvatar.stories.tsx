import React from "react";

import { UserSelfAvatar, UserSelfAvatarProps } from "./UserSelfAvatar";
import { Story } from "@storybook/react";
import { ExampleUserProfile } from "../../../stories/data/UserProfiles";

export default {
  title: "Auth/User Self Avatar",
  component: UserSelfAvatar,
};

const Template: Story<UserSelfAvatarProps> = (args) => (
  <UserSelfAvatar {...args} />
);

export const Default = Template.bind({});
Default.args = {
  userProfile: ExampleUserProfile,
};
