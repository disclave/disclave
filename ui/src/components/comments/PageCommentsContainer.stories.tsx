import React from "react";

import {
  PageCommentsContainer,
  PageCommentsContainerProps,
} from "./PageCommentsContainer";
import { Story } from "@storybook/react";
import {
  commentsTimestampComparator,
  EmptyActionHandler,
  RandomCommentsList,
} from "@/stories/data/Comments";
import { ExampleUserProfile } from "@/stories/data/UserProfiles";

const exampleCommentsShort = RandomCommentsList(10).sort(
  commentsTimestampComparator
);

const exampleComments = RandomCommentsList(50).sort(
  commentsTimestampComparator
);

export default {
  title: "Comments",
  component: PageCommentsContainer,
};

const Template: Story<PageCommentsContainerProps> = (args) => (
  <div>
    <PageCommentsContainer {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  userProfile: ExampleUserProfile,
  comments: exampleCommentsShort,
  commentsActionsHandler: EmptyActionHandler,
};

export const InputTop = Template.bind({});
InputTop.args = {
  inputTop: true,
  userProfile: ExampleUserProfile,
  comments: exampleCommentsShort,
  commentsActionsHandler: EmptyActionHandler,
};

export const CustomClasses = Template.bind({});
CustomClasses.args = {
  userProfile: ExampleUserProfile,
  comments: exampleComments,
  className: "max-h-56",
  commentsActionsHandler: EmptyActionHandler,
};

export const NotAuthenticated = Template.bind({});
NotAuthenticated.args = {
  comments: exampleComments,
  className: "max-h-56",
  loginHref: "https://google.com",
  commentsActionsHandler: EmptyActionHandler,
};

export const NotAuthenticatedInputTop = Template.bind({});
NotAuthenticatedInputTop.args = {
  inputTop: true,
  comments: exampleComments,
  className: "max-h-56",
  loginHref: "https://google.com",
  commentsActionsHandler: EmptyActionHandler,
};

export const Empty = Template.bind({});
Empty.args = {
  userProfile: ExampleUserProfile,
  comments: [],
  className: "max-h-56",
  commentsActionsHandler: EmptyActionHandler,
};