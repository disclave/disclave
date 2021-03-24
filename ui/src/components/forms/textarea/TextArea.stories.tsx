import React from "react";

import { TextArea, TextareaProps } from "./TextArea";
import { Story } from "@storybook/react";

export default {
  title: "Forms/Textarea",
  component: TextArea,
};

const Template: Story<TextareaProps> = (args) => <TextArea {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: "Text",
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  placeholder: "Disabled",
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
