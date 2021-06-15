import React from "react";

import { RankingPage, RankingPageProps } from "./RankingPage";
import { Story } from "@storybook/react";
import {
  buildExamplePage,
  ExamplePage,
  ExamplePageVotedDown,
  ExamplePageVotedUp,
  ExamplePageWithoutLogo,
  ExamplePageWithoutMeta,
  ExamplePageWithoutTitle,
} from "@/stories/data/Pages";

const mockHrefBuilder = (url: string) => url;

export default {
  title: "Pages/Ranking List/Item/RankingPage",
  component: RankingPage,
};

const Template: Story<RankingPageProps> = (args) => <RankingPage {...args} />;

export const Default = Template.bind({});
Default.args = {
  hrefBuilder: mockHrefBuilder,
  authenticated: true,
  page: ExamplePage,
};

export const HideDomainAndLogo = Template.bind({});
HideDomainAndLogo.args = {
  hrefBuilder: mockHrefBuilder,
  authenticated: true,
  hideDomain: true,
  hideLogo: true,
  page: ExamplePage,
};

export const HideDomainAndLogoMainPage = Template.bind({});
HideDomainAndLogoMainPage.args = {
  hrefBuilder: mockHrefBuilder,
  authenticated: true,
  hideDomain: true,
  hideLogo: true,
  page: buildExamplePage({ pageId: "/" }),
};

export const WithoutLogo = Template.bind({});
WithoutLogo.args = {
  hrefBuilder: mockHrefBuilder,
  authenticated: true,
  page: ExamplePageWithoutLogo,
};

export const WithoutTitle = Template.bind({});
WithoutTitle.args = {
  hrefBuilder: mockHrefBuilder,
  authenticated: true,
  page: ExamplePageWithoutTitle,
};

export const WithoutMeta = Template.bind({});
WithoutMeta.args = {
  hrefBuilder: mockHrefBuilder,
  authenticated: true,
  page: ExamplePageWithoutMeta,
};

export const VotedDown = Template.bind({});
VotedDown.args = {
  hrefBuilder: mockHrefBuilder,
  authenticated: true,
  page: ExamplePageVotedDown,
};

export const VotedUp = Template.bind({});
VotedUp.args = {
  hrefBuilder: mockHrefBuilder,
  authenticated: true,
  page: ExamplePageVotedUp,
};

export const MainPage = Template.bind({});
MainPage.args = {
  hrefBuilder: mockHrefBuilder,
  page: buildExamplePage({
    pageId: "%2F",
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
