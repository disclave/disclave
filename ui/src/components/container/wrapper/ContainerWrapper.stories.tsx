import React from "react";

import { ContainerWrapper, ContainerWrapperProps } from "./ContainerWrapper";
import { Story } from "@storybook/react";

export default {
  title: "Container Wrapper",
  component: ContainerWrapper,
};

const Template: Story<ContainerWrapperProps> = (args) => (
  <ContainerWrapper {...args}>
    This is container wrapper content
  </ContainerWrapper>
);

export const Default = Template.bind({});

export const WithTitle = Template.bind({});
WithTitle.args = {
  title: "Container title",
};
