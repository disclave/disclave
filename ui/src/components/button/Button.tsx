import React from "react";
import { getAnchorWrapper } from "../../config";

export interface ButtonProps {
  onClick?: () => void;
  flat?: boolean;
  href?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  flat = false,
  href,
  onClick,
}) => {
  const classes = [
    !flat ? "bg-gray-700 rounded" : "",
    flat ? "text-black" : "text-white",
    "text-sm font-medium uppercase",
    "px-3.5 py-2",
    "focus:outline-none",
  ].join(" ");

  const AnchorTag = getAnchorWrapper() ?? "a";

  const Tag = href ? AnchorTag : "button";
  const Role = href ? "button" : undefined;

  return (
    <Tag role={Role} className={classes} onClick={onClick} href={href}>
      {children}
    </Tag>
  );
};
