import React from "react";

import { Form, FormProps } from "./Form";
import { Story } from "@storybook/react";

export default {
  title: "Forms",
  component: Form,
};

const Template: Story<FormProps> = (args) => <Form {...args} />;

export const Default = Template.bind({});
