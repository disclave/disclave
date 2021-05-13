import { getAnchorWrapper } from "@/config";
import classNames from "classnames";
import React from "react";

export interface LinkBoxProps {
  className?: string;
  href: string;
}

export const LinkBox: React.FC<LinkBoxProps> = ({
  children,
  className,
  href,
}) => {
  const classes = classNames("block rounded hover:bg-gray-100", className);
  const AnchorTag = getAnchorWrapper() ?? "a";

  return (
    <AnchorTag href={href} className={classes}>
      {children}
    </AnchorTag>
  );
};
