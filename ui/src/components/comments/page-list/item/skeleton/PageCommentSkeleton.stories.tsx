import React from "react";

import { PageCommentSkeleton } from "./PageCommentSkeleton";
import { Story } from "@storybook/react";

export default {
  title: "Comments/Lists/Page/PageComment/Skeleton",
  component: PageCommentSkeleton,
};

const Template: Story = (args) => <PageCommentSkeleton {...args} />;

export const Default = Template.bind({});
