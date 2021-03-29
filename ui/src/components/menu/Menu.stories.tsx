import React from "react";

import { Menu, MenuProps } from "./Menu";
import { Story } from "@storybook/react";
import { Button } from "../button";

export default {
  title: "Menu",
  component: Menu,
};

const Template: Story<MenuProps> = (args) => (
  <div>
    Other content
    <Menu {...args} activator={<Button>Show</Button>}>
      <div className="bg-gray-200 shadow p-4">This is menu</div>
    </Menu>
    Other content
  </div>
);

export const Default = Template.bind({});
