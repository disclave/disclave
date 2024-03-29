import React from "react";
import { getAnchorWrapper } from "@/config";
import classNames from "classnames";

type ButtonType = "button" | "submit" | "reset";

export interface ButtonProps {
  disabled?: boolean;
  flat?: boolean;
  href?: string;
  icon?: boolean;
  outlined?: boolean;
  type?: ButtonType;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  disabled = false,
  flat = false,
  href,
  icon = false,
  outlined = false,
  type = "button",
  onClick,
}) => {
  const className = getClassNames({ disabled, flat, icon, outlined });

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

const bgColor = ({ disabled, flat, outlined }: ButtonProps): string | null => {
  if (flat || outlined) return null;
  if (disabled) return "bg-gray-400";
  return "bg-primary";
};

const hoverBgColor = ({ disabled, flat }: ButtonProps): string | null => {
  if (disabled) return null;
  if (flat) return "hover:bg-gray-100";
  return "hover:bg-primary-dark";
};

const borderColor = ({ outlined, disabled }: ButtonProps): string | null => {
  if (!outlined) return null;
  if (!disabled) return "border-primary hover:border-primary-dark";
  return "border-gray-400";
};

const getClassNames = ({
  disabled,
  flat,
  icon,
  outlined,
}: ButtonProps): string => {
  return classNames(
    textColor({ disabled, flat, outlined }),
    { "hover:text-white": outlined },
    bgColor({ disabled, flat, outlined }),
    hoverBgColor({ disabled, flat }),
    { border: outlined },
    borderColor({ outlined, disabled }),
    { "cursor-default pointer-events-none": disabled },
    { "px-3.5 py-2": !icon },
    "transition-colors",
    "text-sm font-medium uppercase",
    "rounded",
    "focus:outline-none",
    "inline-block appearance-none"
  );
};
