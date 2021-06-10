import React from "react";

import { PageListItem, PageListItemProps } from "./PageListItem";
import { Story } from "@storybook/react";
import {
  ExampleComment,
  buildExampleComment,
  EmptyActionHandler,
} from "@/stories/data/PageComments";

export default {
  title: "Comments/Lists/Page/PageListItem",
  component: PageListItem,
};

const Template: Story<PageListItemProps> = (args) => <PageListItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  actionsHandler: EmptyActionHandler,
  comment: ExampleComment,
};

export const Authenticated = Template.bind({});
Authenticated.args = {
  actionsHandler: EmptyActionHandler,
  authenticated: true,
  comment: ExampleComment,
};

export const LongComment = Template.bind({});
LongComment.args = {
  actionsHandler: EmptyActionHandler,
  comment: buildExampleComment({
    text: `This        is a strange comment with\n\n\n new\nlines and     many     spaces.
    dsa.
    
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

HAHAAHAHAH!!!
    `,
  }),
};
