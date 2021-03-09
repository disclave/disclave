import React from "react";

import "./Input.css";

export type InputType = "text" | "email" | "password";

export interface InputProps {
  type?: InputType;
  name?: string;
  value: string;
  onChange?: (value: string) => void;
}

export const Input: React.VFC<InputProps> = ({
  type = "text",
  name,
  value,
  onChange,
}) => {
  const onInputValChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };

  const classes = `
    border rounded
    border-gray-400 focus:border-gray-600
    focus:outline-none
    transition-colors
    px-3 py-1.5
  `;

  return (
    <input
      className={classes}
      type={type}
      name={name}
      value={value}
      onChange={onInputValChange}
    />
  );
};
