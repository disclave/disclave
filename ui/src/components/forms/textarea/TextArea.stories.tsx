import React from "react";

import { Textarea, TextareaProps } from "./Textarea";
import { Story } from "@storybook/react";

export default {
  title: "Forms/Textarea",
  component: Textarea,
};

const Template: Story<TextareaProps> = (args) => <Textarea {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: "Text",
};

export const NotResizable = Template.bind({});
NotResizable.args = {
  placeholder: "Text",
  resizable: false,
  rows: 4,
};

export const AutoGrow = Template.bind({});
AutoGrow.args = {
  autoGrow: true,
};
