import React from "react";

import { Loading } from "./Loading";
import { Story } from "@storybook/react";

export default {
  title: "Loading",
  component: Loading,
};

const Template: Story = (args) => <Loading {...args} />;

export const Default = Template.bind({});
