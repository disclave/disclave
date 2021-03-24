import React from "react";

import {
  RegisterUsernameForm,
  RegisterUsernameFormProps,
} from "./RegisterUsernameForm";
import { Story } from "@storybook/react";
import { sleep } from "../../../../../stories/Helpers";

export default {
  title: "Auth/Register/User name Form",
  component: RegisterUsernameForm,
};

const onSubmitCorrect = async () => {
  await sleep();
};

const onSubmitError = async () => {
  await sleep(2000, { code: "username-error" });
};

const Template: Story<RegisterUsernameFormProps> = (args) => (
  <RegisterUsernameForm {...args} />
);

export const Default = Template.bind({});
Default.args = {
  userEmail: "example@domain.com",
  onSubmit: onSubmitCorrect,
};

export const ErrorHandler = Template.bind({});
ErrorHandler.args = {
  userEmail: "example@domain.com",
  onSubmit: onSubmitError,
};
