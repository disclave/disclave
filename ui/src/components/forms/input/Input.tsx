import React from "react";

import "./Input.css";

export type InputType = "text" | "email" | "password";

export interface InputProps {
  type?: InputType;
  name?: string;
  value: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

export const Input: React.VFC<InputProps> = ({
  type = "text",
  name,
  value,
  placeholder,
  onChange,
}) => {
  const onInputValChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };

  const classes = `form-input`;

  return (
    <input
      className={classes}
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onInputValChange}
    />
  );
};
