import React from 'react';
import { Dot } from './Dot';
import { Line } from './Line';

export const StoryTimeline: React.VFC = () => {
  return (
    <div className="relative h-52 pt-8 my-8">
      <Line />

      <div className="flex flex-row mx-20 justify-center relative">
        <div className="flex-1 px-20 text-right">left</div>
        <Dot />
        <div className="flex-1 px-20">right</div>
      </div>
    </div>
  );
};
