import React from "react";

import { PageComment, PageCommentProps } from "./PageComment";
import { Story } from "@storybook/react";
import {
  ExampleComment,
  buildExampleComment,
} from "@/stories/data/PageComments";
import { EmptyActionHandler } from "@/stories/data/CommentActionsHandler";

export default {
  title: "Comments/Lists/Page/PageComment",
  component: PageComment,
};

const Template: Story<PageCommentProps> = (args) => <PageComment {...args} />;

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
