import React from "react";

import { PageVoting, PageVotingProps } from "./PageVoting";
import { Story } from "@storybook/react";

export default {
  title: "Pages/Voting",
  component: PageVoting,
};

const Template: Story<PageVotingProps> = (args) => <PageVoting {...args} />;

export const Default = Template.bind({});
Default.args = {
  enabled: true,
  votes: {
    sum: 132,
    votedUp: false,
    votedDown: false,
  },
};

export const Zero = Template.bind({});
Zero.args = {
  enabled: true,
  votes: {
    sum: 0,
    votedUp: false,
    votedDown: false,
  },
};

export const Negative = Template.bind({});
Negative.args = {
  enabled: true,
  votes: {
    sum: -15,
    votedUp: false,
    votedDown: false,
  },
};

export const Disabled = Template.bind({});
Disabled.args = {
  enabled: false,
  votes: {
    sum: 132,
    votedUp: false,
    votedDown: false,
  },
};

export const VotedUp = Template.bind({});
VotedUp.args = {
  enabled: true,
  votes: {
    sum: 132,
    votedUp: true,
    votedDown: false,
  },
};

export const VotedDown = Template.bind({});
VotedDown.args = {
  enabled: true,
  votes: {
    sum: 132,
    votedUp: false,
    votedDown: true,
  },
};
