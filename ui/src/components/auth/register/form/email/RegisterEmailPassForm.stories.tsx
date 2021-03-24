import React from "react";

import {
  RegisterEmailPassForm,
  RegisterEmailPassFormProps,
} from "./RegisterEmailPassForm";
import { Story } from "@storybook/react";
import { sleep } from "../../../../../stories/Helpers";

export default {
  title: "Auth/Register/Email-Password Form",
  component: RegisterEmailPassForm,
};

const onSubmitCorrect = async () => {
  await sleep();
};

const onSubmitError = async () => {
  await sleep(2000, "Register error message");
};

const Template: Story<RegisterEmailPassFormProps> = (args) => (
  <RegisterEmailPassForm {...args} />
);

export const Default = Template.bind({});
Default.args = {
  onSubmit: onSubmitCorrect,
};

export const ErrorHandler = Template.bind({});
ErrorHandler.args = {
  onSubmit: onSubmitError,
};
