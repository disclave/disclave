import React from "react";

import { PagesList, PagesListProps } from "./PagesList";
import { Story } from "@storybook/react";
import { RandomPagesList } from "@/stories/data/Pages";

const examplePages = RandomPagesList(10);

const mockHrefBuilder = (url: string) => url;

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

export const HideDomainAndLogo = Template.bind({});
HideDomainAndLogo.args = {
  pages: examplePages,
  hideDomain: true,
  hideLogo: true,
  hrefBuilder: mockHrefBuilder,
};

export const Empty = Template.bind({});
Empty.args = {
  pages: [],
  hrefBuilder: mockHrefBuilder,
};
