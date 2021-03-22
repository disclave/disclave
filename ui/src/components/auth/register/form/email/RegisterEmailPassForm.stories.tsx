import React from "react";

import {
  RegisterEmailPassForm,
  RegisterEmailPassFormProps,
} from "./RegisterEmailPassForm";
import { Story } from "@storybook/react";

export default {
  title: "Auth/Register/Email-Password Form",
  component: RegisterEmailPassForm,
};

const Template: Story<RegisterEmailPassFormProps> = (args) => (
  <RegisterEmailPassForm {...args} />
);

export const Default = Template.bind({});
