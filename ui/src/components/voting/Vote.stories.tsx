import React from "react";

import { Vote, VoteProps } from "./Vote";
import { Story } from "@storybook/react";

export default {
  title: "Vote",
  component: Vote,
};

const Template: Story<VoteProps> = (args) => <Vote {...args} />;

export const Default = Template.bind({});
Default.args = {
  enabled: true,
  votes: {
    sum: 132,
    votedUp: false,
    votedDown: false,
  },
};

export const Vertical = Template.bind({});
Vertical.args = {
  enabled: true,
  vertical: true,
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

export const DisabledVertical = Template.bind({});
DisabledVertical.args = {
  enabled: false,
  vertical: true,
  votes: {
    sum: 132,
    votedUp: false,
    votedDown: false,
  },
};

export const Loading = Template.bind({});
Loading.args = {
  loading: true,
  votes: {
    sum: 132,
    votedUp: false,
    votedDown: false,
  },
};

export const LoadingVertical = Template.bind({});
LoadingVertical.args = {
  loading: true,
  vertical: true,
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
