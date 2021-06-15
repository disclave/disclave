import React from "react";

import { RankingPageSkeleton } from "./RankingPageSkeleton";
import { Story } from "@storybook/react";

export default {
  title: "Pages/Ranking List/Item/RankingPage/Skeleton",
  component: RankingPageSkeleton,
};

const Template: Story = (args) => <RankingPageSkeleton {...args} />;

export const Default = Template.bind({});
