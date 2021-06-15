import React from "react";
import { SkeletonBox } from "@/components/loading";

const urlWidthArr = [
  "w-28",
  "w-32",
  "w-36",
  "w-40",
  "w-44",
  "w-48",
  "w-52",
  "w-56",
];
const titleWidthArr = [
  "w-40",
  "w-48",
  "w-52",
  "w-56",
  "w-60",
  "w-64",
  "w-72",
  "w-80",
  "w-96",
  "w-2/6",
  "w-3/6",
  "w-4/6",
];

export const RankingPageSkeleton: React.VFC = () => {
  return (
    <div className="max-w-full">
      <div className="mb-1.5 flex flex-row space-x-1">
        <SkeletonBox className="h-4 w-4" />
        <SkeletonBox className="h-4" randomWidth={urlWidthArr} />
      </div>

      <SkeletonBox className="h-4 max-w-full" randomWidth={titleWidthArr} />

      <div className="mt-1.5 flex flex-row space-x-2">
        <SkeletonBox className="h-4 w-4" />
        <SkeletonBox className="h-4 w-6" />
        <SkeletonBox className="h-4 w-4" />
      </div>
    </div>
  );
};
