import React from "react";

import { LoginForm, LoginFormProps } from "./LoginForm";
import { Story } from "@storybook/react";
import { sleep } from "../../../../stories/Helpers";

export default {
  title: "Auth/Login/Form",
  component: LoginForm,
};

const onSubmitCorrect = async () => {
  await sleep();
};

const onSubmitError = async () => {
  await sleep(2000, "Error message");
};

const Template: Story<LoginFormProps> = (args) => <LoginForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  onSubmit: onSubmitCorrect,
};

export const ErrorHandler = Template.bind({});
ErrorHandler.args = {
  onSubmit: onSubmitError,
};
