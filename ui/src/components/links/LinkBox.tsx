import { getAnchorWrapper } from "@/config";
import React from "react";

export interface LinkBoxProps {
  href: string;
}

export const LinkBox: React.FC<LinkBoxProps> = ({ children, href }) => {
  const AnchorTag = getAnchorWrapper() ?? "a";

  return (
    <AnchorTag href={href} className="block">
      <div className="rounded hover:bg-gray-100">{children}</div>
    </AnchorTag>
  );
};
