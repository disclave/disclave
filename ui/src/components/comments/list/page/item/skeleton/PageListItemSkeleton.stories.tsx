import React from "react";

import { PageListItemSkeleton } from "./PageListItemSkeleton";
import { Story } from "@storybook/react";

export default {
  title: "Comments/Lists/Page/PageListItem/Skeleton",
  component: PageListItemSkeleton,
};

const Template: Story = (args) => <PageListItemSkeleton {...args} />;

export const Default = Template.bind({});
