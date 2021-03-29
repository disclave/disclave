import React from "react";
import { getAnchorWrapper } from "../../config";

type ButtonType = "button" | "submit" | "reset";

export interface ButtonProps {
  disabled?: boolean;
  flat?: boolean;
  href?: string;
  outlined?: boolean;
  type?: ButtonType;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  disabled = false,
  flat = false,
  href,
  outlined = false,
  type = "button",
  onClick,
}) => {
  const className = getClassNames({ disabled, flat, outlined });

  const AnchorTag = getAnchorWrapper() ?? "a";

  const Tag = href ? AnchorTag : "button";
  const Role = href ? "button" : undefined;

  return (
    <Tag
      role={Role}
      className={className}
      disabled={disabled}
      href={href}
      type={type}
      onClick={onClick}
    >
      {children}
    </Tag>
  );
};

const textColor = ({ disabled, flat, outlined }: ButtonProps): string => {
  if (disabled && (flat || outlined)) return "text-gray-400";
  if (!flat && !outlined) return "text-white";
  return "text-primary";
};

const hoverTextColor = ({ outlined }: ButtonProps): string => {
  if (outlined) return "hover:text-white";
  return "";
};

const bgColor = ({ disabled, flat, outlined }: ButtonProps): string => {
  if (flat || outlined) return "";
  if (disabled) return "bg-gray-400";
  return "bg-primary";
};

const hoverBgColor = ({ disabled, flat }: ButtonProps): string => {
  if (disabled) return "";
  if (flat) return "hover:bg-gray-100";
  return "hover:bg-primary-dark";
};

const border = ({ outlined }: ButtonProps): string => {
  if (outlined) return "border";
  return "";
};

const borderColor = ({ outlined, disabled }: ButtonProps): string => {
  if (!outlined) return "";
  if (!disabled) return "border-primary hover:border-primary-dark";
  return "border-gray-400";
};

const cursorAndPointerEvents = ({ disabled }: ButtonProps): string => {
  if (!disabled) return "";
  return "cursor-default pointer-events-none";
};

const getClassNames = ({ disabled, flat, outlined }: ButtonProps): string => {
  return [
    textColor({ disabled, flat, outlined }),
    hoverTextColor({ outlined }),
    bgColor({ disabled, flat, outlined }),
    hoverBgColor({ disabled, flat }),
    border({ outlined }),
    borderColor({ outlined, disabled }),
    cursorAndPointerEvents({ disabled }),
    "transition-colors",
    "text-sm font-medium uppercase",
    "rounded px-3.5 py-2",
    "focus:outline-none",
  ].join(" ");
};
