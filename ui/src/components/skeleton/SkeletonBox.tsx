import { getRandomElement } from "@/helpers/random";
import { useInterval } from "@/helpers/useInterval";
import classNames from "classnames";
import React, { useState } from "react";

export interface SkeletonBoxProps {
  className?: string;
  randomWidth?: Array<string>;
}

export const SkeletonBox: React.VFC<SkeletonBoxProps> = ({
  className,
  randomWidth,
}) => {
  const calculateRandomWidth = !!randomWidth && !!randomWidth.length;

  const [width, setWidth] = useState<string>(
    calculateRandomWidth ? getRandomElement(randomWidth!) : ""
  );

  if (calculateRandomWidth) {
    const generateWidth = () => {
      setWidth(getRandomElement(randomWidth!));
    };
    useInterval(generateWidth, 1500);
  }

  const classes = classNames(
    "animate-pulse bg-gray-200 rounded transition-all duration-1000",
    width,
    className
  );
  return <div className={classes}></div>;
};
