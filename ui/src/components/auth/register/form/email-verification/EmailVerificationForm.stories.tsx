import React from "react";

import {
  EmailVerificationForm,
  EmailVerificationFormProps,
} from "./EmailVerificationForm";
import { Story } from "@storybook/react";
import { sleep } from "@/stories/Helpers";

export default {
  title: "Auth/Register/Email Verification form",
  component: EmailVerificationForm,
};

const onSubmitCorrect = async () => {
  await sleep();
};

const onSubmitError = async () => {
  await sleep(2000, { code: "email-verification-error" });
};

const Template: Story<EmailVerificationFormProps> = (args) => (
  <EmailVerificationForm {...args} />
);

export const Default = Template.bind({});
Default.args = {
  userEmail: "example@domain.com",
  onSendEmailVerification: onSubmitCorrect,
};

export const ErrorHandler = Template.bind({});
ErrorHandler.args = {
  userEmail: "example@domain.com",
  onSendEmailVerification: onSubmitError,
};
