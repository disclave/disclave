import React from "react";

import { ListItem, ListItemProps } from "./ListItem";
import { Story } from "@storybook/react";
import { buildExamplePage, ExamplePage } from "@/stories/data/Pages";

const mockHrefBuilder = (websiteId: string, pageId: string) =>
  websiteId + decodeURIComponent(pageId);

export default {
  title: "Pages/List/Item/Pages List Item",
  component: ListItem,
};

const Template: Story<ListItemProps> = (args) => <ListItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  hrefBuilder: mockHrefBuilder,
  page: ExamplePage,
};

export const MainPage = Template.bind({});
MainPage.args = {
  hrefBuilder: mockHrefBuilder,
  page: buildExamplePage({
    pageId: "%2F"
  }),
};

export const LongDomainAndPage = Template.bind({});
LongDomainAndPage.args = {
  hrefBuilder: mockHrefBuilder,
  page: buildExamplePage({
    websiteId:
      "this-is-a-veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery-long-domain.com",
    pageId:
      "%2Fexample%2Flooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong%2Fpage%2Fpath",
  }),
};
