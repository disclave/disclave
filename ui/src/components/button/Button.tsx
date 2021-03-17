import React from "react";

export interface ButtonProps {
  onClick?: () => void;
  flat?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  flat = false,
  onClick,
}) => {
  const classes = [
    !flat ? "bg-gray-700 rounded" : "",
    flat ? "text-black" : "text-white",
    "text-sm font-medium uppercase",
    "px-3.5 py-2",
    "focus:outline-none",
  ].join(" ");

  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
};
