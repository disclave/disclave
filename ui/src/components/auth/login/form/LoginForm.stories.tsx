import React from "react";

import { LoginForm, LoginFormProps } from "./LoginForm";
import { Story } from "@storybook/react";
import { sleep } from "../../../../stories/Helpers";

export default {
  title: "Auth/Login/Form",
  component: LoginForm,
};

const onSubmit = async () => {
  await sleep();
};

const Template: Story<LoginFormProps> = (args) => <LoginForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  onSubmit: onSubmit,
};
