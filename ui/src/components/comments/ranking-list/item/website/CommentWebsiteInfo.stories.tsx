import React from "react";

import {
  CommentWebsiteInfo,
  CommentWebsiteInfoProps,
} from "./CommentWebsiteInfo";
import { Story } from "@storybook/react";

export default {
  title: "Comments/Lists/Ranking/RankingComment/WebsiteInfo",
  component: CommentWebsiteInfo,
};

const Template: Story<CommentWebsiteInfoProps> = (args) => (
  <CommentWebsiteInfo {...args} />
);

export const Default = Template.bind({});
Default.args = {
  urlId: {
    websiteId: "example.com",
    pageId: "%2Fexample%2Fpage%2Fpath",
  },
};

export const LongDomain = Template.bind({});
LongDomain.args = {
  urlId: {
    websiteId:
      "this-is-a-veeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeery-long-domain.com",
    pageId: "%2Fexample%2Fpage%2Fpath",
  },
};

export const LongPath = Template.bind({});
LongPath.args = {
  urlId: {
    websiteId: "example.com",
    pageId:
      "%2Fexample%2Flooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong%2Fpage%2Fpath",
  },
};
