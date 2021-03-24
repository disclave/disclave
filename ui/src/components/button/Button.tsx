import React from "react";
import { getAnchorWrapper } from "../../config";

type ButtonType = "button" | "submit" | "reset";

export interface ButtonProps {
  disabled?: boolean;
  flat?: boolean;
  href?: string;
  type?: ButtonType;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  disabled,
  flat = false,
  href,
  type = "button",
  onClick,
}) => {
  const textColor =
    disabled && flat ? "text-gray-400" : !flat ? "text-white" : "";

  const bgColor = !flat ? (disabled ? "bg-gray-400" : "bg-gray-700") : "";

  const hoverBgColor = !disabled
    ? flat
      ? "hover:bg-gray-100"
      : "hover:bg-gray-900"
    : "";

  const cursorAndPointerEvents = disabled
    ? "cursor-default pointer-events-none"
    : "";

  const classes = [
    textColor,
    cursorAndPointerEvents,
    bgColor,
    hoverBgColor,
    "transition-colors",
    "text-sm font-medium uppercase",
    "rounded px-3.5 py-2",
    "focus:outline-none",
  ].join(" ");

  const AnchorTag = getAnchorWrapper() ?? "a";

  const Tag = href ? AnchorTag : "button";
  const Role = href ? "button" : undefined;

  return (
    <Tag
      role={Role}
      className={classes}
      disabled={disabled}
      href={href}
      type={type}
      onClick={onClick}
    >
      {children}
    </Tag>
  );
};
