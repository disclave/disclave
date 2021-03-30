import React from "react";

import { CommentsContainer, CommentsContainerProps } from "./CommentsContainer";
import { Story } from "@storybook/react";
import {
  commentsTimestampComparator,
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
  component: CommentsContainer,
};

const Template: Story<CommentsContainerProps> = (args) => (
  <div>
    <CommentsContainer {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  userProfile: ExampleUserProfile,
  comments: exampleCommentsShort,
};

export const CustomClasses = Template.bind({});
CustomClasses.args = {
  userProfile: ExampleUserProfile,
  comments: exampleComments,
  className: "max-h-56",
};

export const NotAuthenticated = Template.bind({});
NotAuthenticated.args = {
  comments: exampleComments,
  className: "max-h-56",
  loginHref: "https://google.com",
};
