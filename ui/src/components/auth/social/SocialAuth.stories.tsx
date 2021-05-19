import React from "react";

import { SocialAuth, SocialAuthProps } from "./SocialAuth";
import { Story } from "@storybook/react";
import { sleep } from "@/stories/Helpers";

export default {
  title: "Auth/Social",
  component: SocialAuth,
};

const onSubmitCorrect = async () => {
  await sleep();
};

const onSubmitError = async () => {
  await sleep(2000, { code: "login-error" });
};

const Template: Story<SocialAuthProps> = (args) => <SocialAuth {...args} />;

export const Default = Template.bind({});
Default.args = {
  onAuthFacebook: onSubmitCorrect,
  onAuthGoogle: onSubmitCorrect,
};

export const ErrorHandler = Template.bind({});
ErrorHandler.args = {
  onAuthFacebook: onSubmitError,
  onAuthGoogle: onSubmitError,
};
