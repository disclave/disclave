import React from "react";

import { LoginEmailForm, LoginEmailFormProps } from "./LoginEmailForm";
import { Story } from "@storybook/react";
import { sleep } from "@/stories/Helpers";

export default {
  title: "Auth/Login/Email Form",
  component: LoginEmailForm,
};

const onSubmitCorrect = async () => {
  await sleep();
};

const onSubmitError = async () => {
  await sleep(2000, { code: "login-error" });
};

const Template: Story<LoginEmailFormProps> = (args) => (
  <LoginEmailForm {...args} />
);

export const Default = Template.bind({});
Default.args = {
  onSubmit: onSubmitCorrect,
};

export const ErrorHandler = Template.bind({});
ErrorHandler.args = {
  onSubmit: onSubmitError,
};
