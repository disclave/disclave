import React, { useState } from "react";
import { SkeletonBox } from "@/components/skeleton";
import { getRandomInt } from "@/helpers/random";

const nameWidthArr = ["w-12", "w-14", "w-16", "w-20", "w-24", "w-28"];
const commentLineWidthArr = [
  "w-48",
  "w-52",
  "w-56",
  "w-60",
  "w-64",
  "w-72",
  "w-80",
  "w-96",
];
const commentMaxLines = 4;

export const PageListItemSkeleton: React.VFC = () => {
  const commentsLines = getRandomInt(1, commentMaxLines + 1);

  return (
    <div className="max-w-full">
      <div className="mb-1.5 flex flex-row space-x-2">
        <SkeletonBox className="h-4" randomWidth={nameWidthArr} />
        <SkeletonBox className="h-4 w-24" />
      </div>

      <div className="flex flex-col space-y-1">
        {Array.from({ length: commentsLines }).map((_, id) => (
          <SkeletonBox
            key={id}
            className="h-4 max-w-full"
            randomWidth={commentLineWidthArr}
          />
        ))}
      </div>

      <div className="mt-1.5 flex flex-row space-x-2">
        <SkeletonBox className="h-4 w-4" />
        <SkeletonBox className="h-4 w-6" />
        <SkeletonBox className="h-4 w-4" />
      </div>
    </div>
  );
};
