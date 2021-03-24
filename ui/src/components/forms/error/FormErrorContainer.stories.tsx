import React from "react";

import {
  FormErrorContainer,
  FormErrorContainerProps,
} from "./FormErrorContainer";
import { Story } from "@storybook/react";

export default {
  title: "Forms/Error Container",
  component: FormErrorContainer,
};

const Template: Story<FormErrorContainerProps> = (args) => (
  <FormErrorContainer {...args} />
);

export const Default = Template.bind({});
Default.args = {
  error: {
    code: "error-code",
    message: "Error message",
  },
};

export const WithoutMessage = Template.bind({});
WithoutMessage.args = {
  error: {
    code: "error-code",
  },
};
