import * as React from "react";

import { DateTimePreview, DateTimePreviewProps } from "./DateTimePreview";

export default {
  title: "Date/DateTimePreview",
  component: DateTimePreview,
};

const Template = (args: DateTimePreviewProps) => <DateTimePreview {...args} />;

export const Default = Template.bind({});
Default.args = {
  iso: new Date().toISOString(),
};
