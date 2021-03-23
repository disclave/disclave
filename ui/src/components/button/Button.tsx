import React from "react";
import { getAnchorWrapper } from "../../config";

type ButtonType = "button" | "submit" | "reset";

export interface ButtonProps {
  onClick?: () => void;
  flat?: boolean;
  href?: string;
  type?: ButtonType;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  flat = false,
  href,
  type = "button",
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
    <Tag
      role={Role}
      className={classes}
      type={type}
      onClick={onClick}
      href={href}
    >
      {children}
    </Tag>
  );
};
