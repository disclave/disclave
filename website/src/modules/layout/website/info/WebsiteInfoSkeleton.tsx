import React from 'react';
import { SkeletonBox } from '@disclave/ui';

const domainWidthArr = ['w-36', 'w-40', 'w-44', 'w-48', 'w-52', 'w-56', 'w-60', 'w-64', 'w-72'];
const titleWidthArr = [
  'w-52',
  'w-56',
  'w-60',
  'w-64',
  'w-72',
  'w-80',
  'w-96',
  'w-3/6',
  'w-4/6',
  'w-5/6'
];
const pathWidthArr = ['w-60', 'w-64', 'w-72', 'w-80', 'w-96', 'w-3/6', 'w-4/6'];
const urlWidthArr = ['w-60', 'w-64', 'w-72', 'w-80', 'w-96', 'w-3/6', 'w-4/6', 'w-5/6'];

export const WebsiteInfoSkeleton: React.VFC = () => {
  return (
    <div className="max-w-full">
      <div className="flex flex-row max-w-full overflow-hidden">
        <div className="pr-4 my-1 flex flex-col space-y-1">
          <SkeletonBox className="w-5 h-5" />
          <SkeletonBox className="w-6 h-5" />
          <SkeletonBox className="w-5 h-5" />
        </div>
        <div className="flex flex-col space-y-2 max-w-full">
          <div className="flex flex-row space-x-2 max-w-full">
            <SkeletonBox className="w-4 h-4" />
            <SkeletonBox className="h-4 max-w-full" randomWidth={domainWidthArr} />
          </div>
          <SkeletonBox className="h-6 max-w-full" randomWidth={titleWidthArr} />
          <SkeletonBox className="h-4 max-w-full" randomWidth={pathWidthArr} />
        </div>
      </div>
      <SkeletonBox className="h-3 my-3 max-w-full" randomWidth={urlWidthArr} />
    </div>
  );
};
