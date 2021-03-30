import React from "react";

import { Menu, MenuProps } from "./Menu";
import { Story } from "@storybook/react";
import { Button } from "@/components/button";

export default {
  title: "Menu",
  component: Menu,
};

const Template: Story<MenuProps> = (args) => (
  <div className="p-40">
    Other content Other content Other content Other content
    <Menu {...args} activator={<Button>Show</Button>}>
      <div className="bg-gray-200 shadow p-4">This is menu content</div>
    </Menu>
    Other content Other content Other content Other content
  </div>
);

export const Default = Template.bind({});

export const Top = Template.bind({});
Top.args = {
  top: true,
};

export const Left = Template.bind({});
Left.args = {
  left: true,
};
