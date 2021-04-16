import React from "react";

import {
  LoginFormContainer,
  LoginFormContainerProps,
} from "./LoginFormContainer";
import { Story } from "@storybook/react";
import { ExampleSession } from "@/stories/data/Sessions";

export default {
  title: "Auth/Login/Container",
  component: LoginFormContainer,
};

const Template: Story<LoginFormContainerProps> = (args) => (
  <LoginFormContainer {...args} />
);

export const Default = Template.bind({});
Default.args = {
  session: null,
};

export const Loading = Template.bind({});

export const Authenticated = Template.bind({});
Authenticated.args = {
  session: ExampleSession,
};
