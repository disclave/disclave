import React from "react";

import { DateTimePreview, DateTimePreviewProps } from "./DateTimePreview";
import { Story } from "@storybook/react";

export default {
  title: "Date/DateTimePreview",
  component: DateTimePreview,
};

const Template: Story<DateTimePreviewProps> = (args) => (
  <DateTimePreview {...args} />
);

export const Default = Template.bind({});
Default.args = {
  iso: new Date().toISOString(),
};

export const US = Template.bind({});
US.args = {
  iso: new Date().toISOString(),
  locales: "en-US",
};

export const PL = Template.bind({});
PL.args = {
  iso: new Date().toISOString(),
  locales: "pl-PL",
};
