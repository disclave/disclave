import React from "react";

import { CommentPageInfo, CommentPageInfoProps } from "./CommentPageInfo";
import { Story } from "@storybook/react";

export default {
  title: "Comments/Lists/Ranking/RankingComment/PageInfo",
  component: CommentPageInfo,
};

const Template: Story<CommentPageInfoProps> = (args) => (
  <CommentPageInfo {...args} />
);

export const Default = Template.bind({});
Default.args = {
  page: {
    websiteId: "example.com",
    pageId: "%2Fexample%2Fpage%2Fpath",
    meta: {
      logo:
        "https://disclave-pages.s3.amazonaws.com/logo/disclave.com%252F.png",
      title: "This is a title",
    },
  },
};

export const OnlyTitle = Template.bind({});
OnlyTitle.args = {
  page: {
    websiteId: "example.com",
    pageId: "%2Fexample%2Fpage%2Fpath",
    meta: {
      logo: null,
      title: "This is a page title",
    },
  },
};

export const OnlyLogo = Template.bind({});
OnlyLogo.args = {
  page: {
    websiteId: "example.com",
    pageId: "%2Fexample%2Fpage%2Fpath",
    meta: {
      logo:
        "https://disclave-pages.s3.amazonaws.com/logo/disclave.com%252F.png",
      title: null,
    },
  },
};

export const WithoutMeta = Template.bind({});
WithoutMeta.args = {
  page: {
    websiteId: "example.com",
    pageId: "%2Fexample%2Fpage%2Fpath",
    meta: null,
  },
};

export const LongDomain = Template.bind({});
LongDomain.args = {
  page: {
    websiteId:
      "this-is-a-veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery-long-domain.com",
    pageId: "%2Fexample%2Fpage%2Fpath",
    meta: null,
  },
};

export const LongPath = Template.bind({});
LongPath.args = {
  page: {
    websiteId: "example.com",
    pageId:
      "%2Fexample%2Flooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong%2Fpage%2Fpath",
    meta: null,
  },
};
