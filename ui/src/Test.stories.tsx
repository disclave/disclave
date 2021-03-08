import React from "react";

import { Test } from "./Test";

export default {
  title: "Test/Test",
  component: Test,
};

const Template = (args) => <Test {...args} />;

export const Primary = Template.bind({});
