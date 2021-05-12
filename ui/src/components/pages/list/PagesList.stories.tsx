import React from "react";

import { PagesList, PagesListProps } from "./PagesList";
import { Story } from "@storybook/react";
import { RandomPagesList } from "@/stories/data/Pages";

const examplePages = RandomPagesList(10);

const mockHrefBuilder = (websiteId: string, pageId: string) =>
  websiteId + decodeURIComponent(pageId);

export default {
  title: "Pages/List",
  component: PagesList,
};

const Template: Story<PagesListProps> = (args) => <PagesList {...args} />;

export const Default = Template.bind({});
Default.args = {
  pages: examplePages,
  hrefBuilder: mockHrefBuilder,
};

export const Empty = Template.bind({});
Empty.args = {
  pages: [],
  hrefBuilder: mockHrefBuilder,
};
