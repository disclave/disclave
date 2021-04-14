import React from "react";

import {
  CommentWebsiteInfo,
  CommentWebsiteInfoProps,
} from "./CommentWebsiteInfo";
import { Story } from "@storybook/react";
import { CommentUrlMeta } from "@/components/comments/CommentModel";

const hrefBuilder = (urlMeta: CommentUrlMeta) =>
  urlMeta.websiteId + decodeURIComponent(urlMeta.pageId);

export default {
  title: "Comments/List/Item/Header/WebsiteInfo",
  component: CommentWebsiteInfo,
};

const Template: Story<CommentWebsiteInfoProps> = (args) => (
  <CommentWebsiteInfo {...args} />
);

export const Default = Template.bind({});
Default.args = {
  hrefBuilder: hrefBuilder,
  urlMeta: {
    websiteId: "example.com",
    pageId: "%2Fexample%2Fpage%2Fpath",
  },
};

export const LongDomain = Template.bind({});
LongDomain.args = {
  hrefBuilder: hrefBuilder,
  urlMeta: {
    websiteId:
      "this-is-a-veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery-long-domain.com",
    pageId: "%2Fexample%2Fpage%2Fpath",
  },
};

export const LongPath = Template.bind({});
LongPath.args = {
  hrefBuilder: hrefBuilder,
  urlMeta: {
    websiteId: "example.com",
    pageId:
      "%2Fexample%2Flooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong%2Fpage%2Fpath",
  },
};
